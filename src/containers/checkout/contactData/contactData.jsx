import React, { Component } from "react";
import classes from "./contactData.module.css";
import Button from "../../../components/UI/button/button";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/spinner/spinner";
import Input from "../../../components/UI/input/input";
import Select from "../../../components/UI/input/select/select";
import { validateChange } from "./validateChange";

class ContactData extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  state = {
    inputs: [
      {
        name: "name",
        value: "",
        autoFocus: true,
        placeholder: "Name",
        validation: {
          rules: { required: true, min: 5, max: 10 },
          errors: []
        }
      },
      {
        type: "email",
        value: "",
        name: "email",
        placeholder: "Email",
        validation: {
          rules: { required: true, email: true },
          errors: []
        }
      },
      {
        name: "street",
        value: "",
        placeholder: "Street",
        validation: {
          rules: { required: true, min: 5, max: 10 },
          errors: []
        }
      },
      {
        name: "postalcode",
        value: "",
        placeholder: "Postal Code",
        validation: {
          rules: { required: true, min: 5, max: 10 },
          errors: []
        }
      }
    ],
    deliverymethod: "",
    loading: false,
    order: false
  };

  componentDidMount() {
    window.scrollTo(0, this.myRef.current.offsetTop);
  }

  handleChange = ({ currentTarget: input }) => {
    let { inputs, deliverymethod } = this.state;

    // inputs validation
    const index = inputs.indexOf(inputs.find(i => i.name === input.name));
    const { rules } = this.state.inputs[index].validation;
    inputs[index].value = input.value;
    const errors = validateChange(input, rules);
    inputs[index].validation.errors = errors;

    this.setState({
      inputs,
      order: this.orderDisabled(inputs, deliverymethod)
    });
  };

  handleSelectChanged = ({ currentTarget: select }) => {
    const { inputs } = this.state;
    this.setState({
      [[select.name]]: select.value,
      order: this.orderDisabled(inputs, select.value)
    });
  };

  orderDisabled = (inputs, deliverymethod) => {
    const order = inputs.some(i => !i.value);
    const allErrors = inputs.some(i => i.validation.errors.length > 0);
    return !order && !allErrors && deliverymethod !== "";
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ loading: true });
    const { ingredients, totalPrice } = this.props;
    const { inputs, deliverymethod } = this.state;
    const order = {
      ingredients,
      deliverymethod,
      totalPrice: totalPrice / 10,
      time: new Date().toISOString()
    };
    for (const index in inputs) {
      order[inputs[index].name] = inputs[index].value;
    }

    axios
      .post("/orders.json", order)
      .then(() => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  };

  render() {
    const { inputs, loading, order } = this.state;
    let form = null;
    loading
      ? (form = <Spinner />)
      : (form = (
          <form ref={this.myRef}>
            {inputs.map(input => (
              <Input
                key={input.name}
                name={input.name}
                autoFocus={input.autoFocus}
                placeholder={input.placeholder}
                value={input.value}
                errors={input.validation.errors}
                onChange={this.handleChange}
              />
            ))}

            <Select
              onChange={this.handleSelectChanged}
              name="deliverymethod"
              selected="Delivary Method"
              options={["Fastest", "Cheapest"]}
            />
            <Button
              btnType="submit"
              disabled={!order}
              onClick={this.handleSubmit}
            >
              ORDER
            </Button>
          </form>
        ));

    return (
      <div className={classes.contactData}>
        <h2>Enter Your Contact Data</h2>
        {form}
      </div>
    );
  }
}

export default ContactData;
