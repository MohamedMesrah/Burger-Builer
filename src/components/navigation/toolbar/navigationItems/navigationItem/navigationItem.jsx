import React from "react";
import classes from "./navigationItem.module.css";
import { NavLink } from "react-router-dom";

const NavigationItem = ({ link, children, exact, onNavigate }) => {
  return (
    <li className={classes.navigationItem}>
      <NavLink
        exact={exact}
        activeClassName={classes.active}
        to={link}
        onClick={onNavigate}
      >
        {children}
      </NavLink>
    </li>
  );
};

export default NavigationItem;
