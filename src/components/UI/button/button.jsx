import React from "react";
import classes from "./button.module.css";

const Button = ({
  btnType = "button",
  disabled = false,
  children,
  onClick
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={[classes.button, classes[btnType]].join(" ")}
    >
      {children}
    </button>
  );
};

export default Button;
