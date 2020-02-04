import React from "react";
import NavigationItem from "./navigationItem/navigationItem";
import classes from "./navigationItems.module.css";

const NavigationItems = () => {
  return (
    <ul className={classes.navigationItems}>
      <NavigationItem exact link="/">
        Burger Builder
      </NavigationItem>
      <NavigationItem link="/orders">Orders</NavigationItem>
    </ul>
  );
};

export default NavigationItems;
