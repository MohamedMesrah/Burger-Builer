import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  ingredients: null,
  totalPrice: 0,
  error: false,
  building: false
};

const INGREDIENT_PRICES = {
  salad: 2,
  cheese: 3,
  meat: 5
};

const addIngredient = (state, action) => {
  const ingredients = {
    ...state.ingredients,
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
  };
  const totalPrice =
    state.totalPrice + INGREDIENT_PRICES[action.ingredientName];
  return updateObject(state, { ingredients, totalPrice, building: true });
};

const removeIngredient = (state, action) => {
  const ingredients = {
    ...state.ingredients,
    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
  };
  const totalPrice =
    state.totalPrice - INGREDIENT_PRICES[action.ingredientName];
  return updateObject(state, { ingredients, totalPrice });
};

const setIngredient = (state, action) => {
  return updateObject(state, {
    ingredients: action.ingredients,
    totalPrice: 0,
    building: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);

    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);

    case actionTypes.SET_INGREDIENT:
      return setIngredient(state, action);

    case actionTypes.SET_INGREDIENT_FAILD:
      return updateObject(state, { error: true });

    default:
      return state;
  }
};

export default reducer;
