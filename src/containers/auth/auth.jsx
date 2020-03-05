import React, { Component } from "react";
import Input from "../../components/UI/input/input";
import { validateChange } from "../checkout/contactData/validateChange";
import classes from "./auth.module.css";
import { Fragment } from "react";
import Button from "../../components/UI/button/button";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/spinner/spinner";
import Alert from "../../components/UI/alert/alert";
import { Redirect } from "react-router";

class Auth extends Component {
  state = {
    inputs: [
      {
        type: "email",
        value: "",
        name: "email",
        placeholder: "Mail Address",
        autoFocus: true,
        validation: {
          rules: { required: true, email: true },
          errors: []
        }
      },
      {
        type: "password",
        value: "",
        name: "password",
        placeholder: "Password",
        validation: {
          rules: { required: true, min: 6, max: 20 },
          errors: []
        }
      }
    ],
    isSingup: false
  };

  handleChange = ({ currentTarget: input }) => {
    let { inputs } = this.state;

    // inputs validation
    const index = inputs.indexOf(inputs.find(i => i.name === input.name));
    const { rules } = this.state.inputs[index].validation;
    inputs[index].value = input.value;
    const errors = validateChange(input, rules);
    inputs[index].validation.errors = errors;

    this.setState({ inputs });
  };

  handleSubmit = (e, email, password) => {
    e.preventDefault();
    this.props.onSubmit(email, password, this.state.isSingup);
  };

  handleToggleSignMode = e => {
    e.preventDefault();
    this.setState(prevState => ({ isSingup: !prevState.isSingup }));
  };

  render() {
    const { inputs, isSingup } = this.state;
    const { isAuth, building } = this.props;
    const disabledSubmit =
      inputs.some(i => i.validation.errors.length > 0) ||
      inputs.some(i => i.value === "");

    return (
      <Fragment>
        {building && isAuth ? (
          <Redirect to="/checkout" />
        ) : (
          isAuth && <Redirect to="/" />
        )}
        <form className={classes.form}>
          {this.props.loading ? (
            <Spinner />
          ) : (
            <Fragment>
              <h3>{isSingup ? "Sign Up" : "Sign In"}</h3>
              {this.props.error && (
                <Alert onClick={this.props.clearErrors}>
                  {this.props.error.message.replace(/_/g, " ")}
                </Alert>
              )}
              {inputs.map(input => (
                <Input
                  key={input.name}
                  name={input.name}
                  autoFocus={input.autoFocus}
                  placeholder={input.placeholder}
                  value={input.value}
                  type={input.type}
                  errors={input.validation.errors}
                  onChange={this.handleChange}
                />
              ))}
              <div className={classes.btns}>
                <Button
                  btnType="submit"
                  className={classes.submit}
                  disabled={disabledSubmit}
                  onClick={e =>
                    this.handleSubmit(e, inputs[0].value, inputs[1].value)
                  }
                >
                  Submit
                </Button>
                <Button
                  btnType="danger"
                  className={classes.danger}
                  onClick={this.handleToggleSignMode}
                >
                  Switch To {isSingup ? "Signin" : "Signup"}
                </Button>
              </div>
            </Fragment>
          )}
        </form>
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onSubmit: (email, password, isSingup) =>
    dispatch(actions.auth(email, password, isSingup)),
  clearErrors: () => dispatch(actions.clearErrors())
});
const mapStateToProps = state => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isAuth: state.auth.token !== null,
  building: state.builder.building
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
