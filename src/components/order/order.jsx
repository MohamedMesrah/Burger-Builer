import React from "react";
import Button from "../UI/button/button";
import classes from "./order.module.css";

const Order = ({ totalPrice, ingredients, time, onOrderDelete }) => {
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
          Total Price:{" "}
          <strong className={classes.priceText}>{totalPrice} $</strong>
          <Button
            className={classes.delete}
            btnType="danger"
            onClick={onOrderDelete}
          >
            Delete
          </Button>
        </p>
      </div>
    </div>
  );
};

export default Order;
