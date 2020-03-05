import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./logo.module.css";
import logo from "../../assets/images/logo.png";
import Tooltip from "../UI/tooltip/tooltip";

const Logo = () => {
  return (
    <div className={classes.container}>
      <NavLink to="/">
        <img src={logo} className={classes.logo} alt="logo" />
        <div className={classes.tooltip}>
          <Tooltip>Home</Tooltip>
        </div>
      </NavLink>
    </div>
  );
};

export default Logo;
