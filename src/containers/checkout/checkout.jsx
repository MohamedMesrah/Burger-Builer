import React, { Component, Fragment } from "react";
import CheckoutSummary from "../../components/checkoutSummary/checkoutSummary";
import { withRouter, Route } from "react-router-dom";
import ContactData from "./contactData/contactData";

class Checkout extends Component {
  state = {
    ingredients: null,
    loading: false,
    totalPrice: 0
  };

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    let ingredients = {};
    let totalPrice = 0;
    for (const param of query.entries()) {
      if (param[0] === "totalPrice") {
        totalPrice = +param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }
    this.setState({ ingredients, totalPrice });
  }

  handleCancel = () => {
    this.props.history.goBack();
  };

  handleContinue = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    const { ingredients, totalPrice } = this.state;
    return (
      <Fragment>
        <CheckoutSummary
          ingredients={ingredients}
          onCancel={this.handleCancel}
          onContinue={this.handleContinue}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          render={props => (
            <ContactData
              ingredients={ingredients}
              totalPrice={totalPrice}
              {...props}
            />
          )}
        />
      </Fragment>
    );
  }
}

export default withRouter(Checkout);
