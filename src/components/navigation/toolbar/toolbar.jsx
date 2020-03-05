import React, { Component } from "react";
import NavigationItems from "./navigationItems/navigationItems";
import SideDrawer from "../sideDrawer/sideDrawer";
import classes from "./toolbar.module.css";
import SideDrawerItems from "../sideDrawer/sideDrawerItems/sideDrawerItems";
import Logo from "../../logo/logo";
import { connect } from "react-redux";

class Toolbar extends Component {
  state = { show: false };

  handleToggle = () => {
    this.setState({ show: !this.state.show });
  };

  handleBackDropCancel = () => {
    this.setState({ show: false });
  };

  render() {
    const { isAuth } = this.props;
    return (
      <header className={classes.toolbar}>
        <SideDrawer
          show={this.state.show}
          onClick={this.handleToggle}
          onBackDropCancel={this.handleToggle}
        >
          <nav>
            <SideDrawerItems
              isAuth={isAuth}
              onNavigate={this.handleBackDropCancel}
            />
          </nav>
        </SideDrawer>
        <Logo />

        <nav className={classes.nav}>
          <NavigationItems isAuth={isAuth} />
        </nav>
      </header>
    );
  }
}

const mapStateToProps = state => ({
  isAuth: state.auth.token !== null
});

export default connect(mapStateToProps)(Toolbar);
