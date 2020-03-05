import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = { orders: [], loading: false };

const setOrdersStart = state => {
  return updateObject(state, { loading: true });
};

const setOrdersSuccess = (state, action) => {
  return updateObject(state, {
    orders: action.orders,
    loading: false
  });
};

const deleteOrder = (state, action) => {
  const orders = state.orders.filter(o => o.id !== action.id);
  return updateObject(state, {
    orders
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ORDERS_START:
      return setOrdersStart(state);

    case actionTypes.SET_ORDERS_SUCCESS:
      return setOrdersSuccess(state, action);

    case actionTypes.SET_ORDERS_FAILD:
      return updateObject(state, { loading: false });

    case actionTypes.DELETE_ORDER:
      return deleteOrder(state, action);

    default:
      return state;
  }
};

export default reducer;
