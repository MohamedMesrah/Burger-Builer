import React from "react";
import classes from "./tooltip.module.css";

const Tooltip = ({ children }) => {
  return <span className={classes.tooltip}>{children}</span>;
};

export default Tooltip;
