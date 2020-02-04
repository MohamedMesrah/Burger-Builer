import React from "react";
import classes from "./backDrop.module.css";

const BackDrop = ({ show, onBackDropCancel }) => {
  return show ? (
    <div className={classes.backDrop} onClick={onBackDropCancel}></div>
  ) : null;
};

export default BackDrop;
