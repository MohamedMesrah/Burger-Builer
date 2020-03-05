import React, { Component } from "react";
import Order from "../../components/order/order";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/spinner/spinner";
import Button from "../../components/UI/button/button";
import { connect } from "react-redux";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as orderCreators from "../../store/actions/index";
import classes from "./orders.module.css";

class Orders extends Component {
  componentDidMount() {
    const { onOrdersInit, token, userId } = this.props;
    onOrdersInit(token, userId);
  }

  handleOrder = () => {
    this.props.history.push("/");
  };

  render() {
    const { orders, loading, token } = this.props;
    let renderOrders = null;
    loading
      ? (renderOrders = <Spinner className={classes.spinner} />)
      : (renderOrders = (
          <div style={{ width: "100%", position: "absolute" }}>
            {!orders.length > 0 ? (
              <div className={classes.noOrders}>
                <div>There is no orders yet..</div>
                <Button className={classes.order} onClick={this.handleOrder}>
                  ORDER NOW
                </Button>
              </div>
            ) : (
              orders.map(o => (
                <Order
                  key={o.id}
                  ingredients={o.ingredients}
                  totalPrice={o.totalPrice}
                  time={o.time}
                  onOrderDelete={() => this.props.onOrderDelete(o.id, token)}
                />
              ))
            )}
          </div>
        ));
    return renderOrders;
  }
}

const mapStateToProps = state => ({
  orders: state.orders.orders,
  loading: state.orders.loading,
  token: state.auth.token,
  userId: state.auth.userId
});

const mapDispatchToProps = dispatch => ({
  onOrdersInit: (token, userId) =>
    dispatch(orderCreators.initOrders(token, userId)),
  onOrderDelete: (id, token) => dispatch(orderCreators.deleteOrder(id, token))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
