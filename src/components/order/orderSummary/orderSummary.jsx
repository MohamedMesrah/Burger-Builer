import React from "react";
import classes from "./orderSummary.module.css";
import Button from "../../UI/button/button";

const OrderSummery = ({
  ingredients,
  totalPrice,
  purchasing,
  onCancel,
  onContinue
}) => {
  return (
    <div className={classes.orderSummary}>
      <h3>Your Order</h3>
      <p>A dilicious burger with the following ingredients:</p>
      <ul>
        {!ingredients
          ? null
          : Object.keys(ingredients).map(igKey => (
              <li key={igKey}>
                <span>{igKey}</span> : {ingredients[igKey]}
              </li>
            ))}
      </ul>
      <strong>Total Price: {totalPrice / 10} $</strong>
      <p>Continue?</p>
      <Button disabled={!purchasing} btnType="danger" onClick={onCancel}>
        CANCEL
      </Button>
      <Button disabled={!purchasing} btnType="success" onClick={onContinue}>
        CONTINUE
      </Button>
    </div>
  );
};

export default OrderSummery;
