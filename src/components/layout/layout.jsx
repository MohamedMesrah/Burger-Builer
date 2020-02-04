import React from "react";
import Aux from "../../hoc/aux";
import classes from "./layout.module.css";
import Toolbar from "../navigation/toolbar/toolbar";

const Layout = props => {
  return (
    <Aux>
      <Toolbar />
      <main className={classes.content}>{props.children}</main>
    </Aux>
  );
};

export default Layout;
