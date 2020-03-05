import React, { Component } from "react";
import classes from "./input.module.css";

class Input extends Component {
  state = { show: false };

  handleToggleErrors = () => {
    this.setState(prevState => {
      return { show: !prevState.show };
    });
  };

  render() {
    const fasClasses =
      this.props.errors.length > 0
        ? [classes.warning, "fas", "fa-exclamation-circle"]
        : [classes.success, "fas", "fa-check-circle"];
    return (
      <div className={classes.input}>
        <input
          className={classes.inputElement}
          type={this.props.type}
          {...this.props}
        />
        <div className={classes.line}></div>
        {this.props.errors.length > 0 ? (
          <i
            onMouseDown={this.handleToggleErrors}
            className={fasClasses.join(" ")}
          ></i>
        ) : (
          this.props.value !== "" && <i className={fasClasses.join(" ")}></i>
        )}
        {this.props.errors.length > 0 &&
          document.activeElement.name === this.props.name &&
          this.state.show && (
            <div className={classes.error}>{this.props.errors[0]}</div>
          )}
      </div>
    );
  }
}

export default Input;
