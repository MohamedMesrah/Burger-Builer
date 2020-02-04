import React from "react";
import classes from "./buildControl.module.css";

const BuildControl = ({ label, add, remove, disabledInfo }) => {
  return (
    <div className={classes.buildControl}>
      <div className={classes.label}>{label}</div>
      <button
        className={classes.minus}
        onClick={remove}
        disabled={disabledInfo}
      >
        -
      </button>
      <button className={classes.plus} onClick={add}>
        +
      </button>
    </div>
  );
};

export default BuildControl;
