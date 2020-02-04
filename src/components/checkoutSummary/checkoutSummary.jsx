import React from "react";
import Button from "../UI/button/button";
import Burger from "../burger/burger";
import classes from "./checkoutSummary.module.css";

const CheckoutSummary = ({ ingredients, onCancel, onContinue }) => {
  return (
    <div className={classes.checkoutSummary}>
      <h1>We hope it tastes well!</h1>
      <Burger check={true} ingredients={ingredients} />
      <div className={classes.btns}>
        <Button btnType="danger" onClick={onCancel}>
          CANCEL
        </Button>
        <Button btnType="success" onClick={onContinue}>
          CONTINUE
        </Button>
      </div>
    </div>
  );
};

export default CheckoutSummary;
