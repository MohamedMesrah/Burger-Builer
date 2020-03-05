import React, { Fragment } from "react";
import NavigationItem from "./navigationItem/navigationItem";
import classes from "./navigationItems.module.css";

const NavigationItems = ({ isAuth }) => {
  return (
    <ul className={classes.navigationItems}>
      <NavigationItem exact link="/">
        Burger Builder
      </NavigationItem>
      {!isAuth ? (
        <NavigationItem link="/auth">Sign-In / Sign-Up</NavigationItem>
      ) : (
        <Fragment>
          <NavigationItem link="/orders">Orders</NavigationItem>
          <NavigationItem link="/logout">Logout</NavigationItem>
        </Fragment>
      )}
    </ul>
  );
};

export default NavigationItems;
