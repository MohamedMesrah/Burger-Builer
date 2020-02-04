import React from "react";
import NavigationItem from "../../toolbar/navigationItems/navigationItem/navigationItem";
import classes from "./sideDrawerItems.module.css";

const SideDrawerItems = ({ onNavigate }) => {
  return (
    <div className={classes.sideDrawerItems}>
      <h1>My Burger</h1>
      <NavigationItem onNavigate={onNavigate} exact link="/">
        Brger Builder
      </NavigationItem>
      <NavigationItem onNavigate={onNavigate} link="/orders">
        Orders
      </NavigationItem>
    </div>
  );
};

export default SideDrawerItems;
