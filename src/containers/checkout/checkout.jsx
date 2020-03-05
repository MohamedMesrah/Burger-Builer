import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Redirect } from "react-router-dom";

import CheckoutSummary from "../../components/checkoutSummary/checkoutSummary";
import ContactData from "./contactData/contactData";

class Checkout extends Component {
  state = { loading: false };

  handleCancel = () => {
    this.props.history.goBack();
  };

  handleContinue = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    const { ings } = this.props;
    return ings ? (
      <Fragment>
        <CheckoutSummary
          ingredients={ings}
          onCancel={this.handleCancel}
          onContinue={this.handleContinue}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          render={props => <ContactData {...props} />}
        />
      </Fragment>
    ) : (
      <Redirect to="/" />
    );
  }
}

const mapStateToProps = state => ({
  ings: state.builder.ingredients
});

export default connect(mapStateToProps)(withRouter(Checkout));
