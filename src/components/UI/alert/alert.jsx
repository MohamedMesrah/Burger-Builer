import React, { Component } from "react";
import classes from "./alert.module.css";

class Alert extends Component {
  state = {
    display: "block"
  };
  handleClick = () => {
    this.setState({ display: "none" });
  };
  render() {
    return (
      <div
        className={classes.alert}
        style={{ display: this.state.display }}
        onClick={() => {
          this.handleClick();
          this.props.onClick();
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Alert;
