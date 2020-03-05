import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const setOrdersStart = () => ({
  type: actionTypes.SET_ORDERS_START
});

export const setOrdersSuccess = fetchedOrders => ({
  type: actionTypes.SET_ORDERS_SUCCESS,
  orders: fetchedOrders
});

export const setOrdersFaild = () => ({
  type: actionTypes.SET_ORDERS_FAILD
});

export const initOrders = (token, userId) => {
  return dispatch => {
    dispatch(setOrdersStart());
    axios
      .get(`/orders.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`)
      .then(res => {
        let fetchedOrders = [];
        for (const key in res.data) {
          fetchedOrders.push({ id: key, ...res.data[key] });
        }
        dispatch(setOrdersSuccess(fetchedOrders));
      })
      .catch(error => {
        dispatch(setOrdersFaild());
      });
  };
};
export const deleteOrder = (id, token) => {
  return dispatch => {
    axios
      .delete(`/orders/${id}.json?auth=${token}`)
      .then(res => dispatch({ type: actionTypes.DELETE_ORDER, id }))
      .catch(err => alert("error"));
  };
};
