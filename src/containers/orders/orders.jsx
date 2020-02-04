import React, { Component } from "react";
import Order from "../../components/order/order";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/spinner/spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends Component {
  state = {
    orders: null,
    loading: true,
    error: false
  };

  componentDidMount() {
    axios
      .get("/orders.json")
      .then(res => {
        let fetchedOrders = [];
        for (const key in res.data) {
          fetchedOrders.push({ id: key, ...res.data[key] });
        }

        this.setState({ orders: fetchedOrders, loading: false });
      })
      .catch(err => this.setState({ error: true }));
  }

  render() {
    const { orders, loading, error } = this.state;
    let renderOrders = null;
    loading
      ? (renderOrders = <Spinner />)
      : (renderOrders = orders.map(o => (
          <Order
            key={o.id}
            ingredients={o.ingredients}
            totalPrice={o.totalPrice}
            time={o.time}
          />
        )));
    return (
      <div style={{ width: "100%", position: "absolute" }}>
        {!error && renderOrders}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
