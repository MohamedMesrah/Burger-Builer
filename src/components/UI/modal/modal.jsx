import React, { Component } from "react";
import classes from "./modal.module.css";

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    );
  }
  render() {
    return (
      <div
        className={classes.modal}
        style={{
          transform: this.props.show ? "translateY(0)" : "translateY(-200vh)"
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Modal;
