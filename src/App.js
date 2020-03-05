import React, { Component } from "react";
import Layout from "./components/layout/layout";
import BurgerBuilder from "./containers/burgerBuilder/burgerBuilder";
import { Route, Switch, Redirect } from "react-router-dom";
import Checkout from "./containers/checkout/checkout";
import Orders from "./containers/orders/orders";
import Auth from "./containers/auth/auth";
import Logout from "./containers/auth/logout/logout";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";
import NotFound from "./components/notFound/notFound";

class App extends Component {
  componentDidMount() {
    const { userId, checkAuth } = this.props;
    checkAuth(userId);
  }

  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/checkout" component={Checkout} />
          {this.props.isAuth && <Route path="/orders" component={Orders} />}
          <Route path="/auth" component={Auth} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </Layout>
    );
  }
}
const mapStateToProps = state => ({
  isAuth: state.auth.token !== null,
  userId: state.auth.userId
});

const mapDispatchToProps = dispatch => ({
  checkAuth: userId => dispatch(actions.checkAuth(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
