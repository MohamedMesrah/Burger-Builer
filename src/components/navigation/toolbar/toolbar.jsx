import React, { Component } from "react";
import NavigationItems from "./navigationItems/navigationItems";
import SideDrawer from "../sideDrawer/sideDrawer";
import classes from "./toolbar.module.css";
import SideDrawerItems from "../sideDrawer/sideDrawerItems/sideDrawerItems";

class Toolbar extends Component {
  state = { show: false };

  handleToggle = () => {
    this.setState({ show: !this.state.show });
  };

  handleBackDropCancel = () => {
    this.setState({ show: false });
  };

  render() {
    return (
      <header className={classes.toolbar}>
        <SideDrawer
          show={this.state.show}
          onClick={this.handleToggle}
          onBackDropCancel={this.handleToggle}
        >
          <nav>
            <SideDrawerItems onNavigate={this.handleBackDropCancel} />
          </nav>
        </SideDrawer>
        <nav className={classes.nav}>
          <NavigationItems />
        </nav>
      </header>
    );
  }
}

export default Toolbar;
