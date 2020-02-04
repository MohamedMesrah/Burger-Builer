import React, { Component } from "react";
import Layout from "./components/layout/layout";
import BurgerBuilder from "./containers/burgerBuilder/burgerBuilder";
import { Route, Switch } from "react-router-dom";
import Checkout from "./containers/checkout/checkout";
import Orders from "./containers/orders/orders";

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/" exact component={BurgerBuilder} />
        </Switch>
      </Layout>
    );
  }
}

export default App;
