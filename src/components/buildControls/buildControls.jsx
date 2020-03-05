import React from "react";
import BuildControl from "./buildControl/buildControl";
import classes from "./buildControls.module.css";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" }
];

const BuildControls = ({
  addIngredient,
  removeIngredient,
  disabledInfo,
  totalPrice,
  purchasable,
  ordered,
  isAuth
}) => {
  return (
    <div className={classes.buildControls}>
      <p>Current Price: {totalPrice / 10} $</p>
      {controls.map(c => (
        <BuildControl
          add={() => addIngredient(c.type)}
          remove={() => removeIngredient(c.type)}
          key={c.label}
          label={c.label}
          disabledInfo={disabledInfo[c.type]}
        />
      ))}
      <button
        onClick={ordered}
        disabled={!purchasable}
        className={classes.order}
      >
        {isAuth ? "ORDER NOW" : "SIGNUP TO ORDER"}
      </button>
    </div>
  );
};

export default BuildControls;
