import React, { Fragment } from "react";
import NavigationItem from "../../toolbar/navigationItems/navigationItem/navigationItem";
import classes from "./sideDrawerItems.module.css";

const SideDrawerItems = ({ isAuth, onNavigate }) => {
  return (
    <div className={classes.sideDrawerItems}>
      <h1>My Burger</h1>
      <NavigationItem onNavigate={onNavigate} exact link="/">
        Brger Builder
      </NavigationItem>

      {!isAuth ? (
        <NavigationItem onNavigate={onNavigate} link="/auth">
          Sign-In / Sign-Up
        </NavigationItem>
      ) : (
        <Fragment>
          <NavigationItem onNavigate={onNavigate} link="/orders">
            Orders
          </NavigationItem>
          <NavigationItem onNavigate={onNavigate} link="/logout">
            Logout
          </NavigationItem>
        </Fragment>
      )}
    </div>
  );
};

export default SideDrawerItems;
