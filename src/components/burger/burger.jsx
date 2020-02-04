import React from "react";
import classes from "./burger.module.css";
import BurgerIngredient from "./burgerIngredient/burgerIngredient";

const Burger = ({ check = null, ingredients }) => {
  const transformedIngredients = !ingredients
    ? null
    : Object.keys(ingredients)
        .map(k => {
          return [...Array(ingredients[k])].map((_, i) => {
            return <BurgerIngredient key={k + i} type={k} />;
          });
        })
        .reduce((arr, el) => {
          return arr.concat(el);
        }, []);

  let style = {};
  check ? (style = { overflow: "visible" }) : (style = {});

  return (
    <div style={style} className={classes.burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients && transformedIngredients.length === 0 ? (
        <p>Please start adding ingredients!</p>
      ) : (
        transformedIngredients
      )}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default Burger;
