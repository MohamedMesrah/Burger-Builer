import React from "react";
import classes from "./input.module.css";

const Input = ({ ...props }, type = "text") => {
  const fasClasses =
    props.errors.length > 0
      ? [classes.warning, "fas", "fa-exclamation-circle"]
      : [classes.success, "fas", "fa-check-circle"];
  return (
    <div className={classes.input}>
      <input className={classes.inputElement} type={type} {...props} />
      {props.errors.length > 0 ? (
        <i className={fasClasses.join(" ")}></i>
      ) : (
        props.value !== "" && <i className={fasClasses.join(" ")}></i>
      )}
      <div className={classes.line}></div>
      {props.errors.length > 0 &&
        document.activeElement.name === props.name && (
          <div className={classes.error}>{props.errors[0]}</div>
        )}
    </div>
  );
};

export default Input;
