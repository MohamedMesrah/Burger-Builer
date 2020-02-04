import React from "react";
import classes from "./menu.module.css";

const MenuIcon = () => {
  return (
    <div className={classes.MenuIcon}>
      <div className={classes.bar}></div>
      <div className={classes.bar}></div>
      <div className={classes.bar}></div>
    </div>
  );
};

export default MenuIcon;
