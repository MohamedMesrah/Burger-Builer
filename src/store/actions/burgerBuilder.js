import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const addIngredient = name => ({
  type: actionTypes.ADD_INGREDIENT,
  ingredientName: name
});

export const removeIngredient = name => ({
  type: actionTypes.REMOVE_INGREDIENT,
  ingredientName: name
});

export const initIngredients = () => {
  return dispatch => {
    axios
      .get("/ingredients.json")
      .then(response => {
        dispatch({
          type: actionTypes.SET_INGREDIENT,
          ingredients: response.data
        });
      })
      .catch(error => {
        dispatch({ type: actionTypes.SET_INGREDIENT_FAILD, error: true });
      });
  };
};

export const setIngredientsFaild = () => ({
  type: actionTypes.SET_INGREDIENT_FAILD
});
