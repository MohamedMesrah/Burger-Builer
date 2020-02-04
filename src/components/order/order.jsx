import React from "react";
import classes from "./order.module.css";

const Order = ({ totalPrice, ingredients, time }) => {
  const regex = /[a-z]+/gi;
  return (
    <div className={classes.order}>
      <div className={classes.time}>
        {time.replace(regex, " ").slice(0, 16)}
      </div>
      <div className={classes.ingredients}>
        Ingredients:
        {Object.keys(ingredients).map(
          igKey =>
            ingredients[igKey] > 0 && (
              <span
                className={[classes.ingredient, classes[igKey]].join(" ")}
                key={igKey}
              >
                {" "}
                {igKey} ({ingredients[igKey]})
              </span>
            )
        )}
        <p>
          Total Price: <strong className={classes.price}>{totalPrice} $</strong>
        </p>
      </div>
    </div>
  );
};

export default Order;
