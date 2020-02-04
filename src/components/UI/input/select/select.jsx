import React, { Fragment } from "react";
import classes from "./select.module.css";

const Select = props => {
  return (
    <Fragment>
      {props.options && (
        <Fragment>
          <select className={classes.select} {...props}>
            <option hidden defaultValue>
              {props.selected}
            </option>

            {props.options.map(option => (
              <option
                key={option}
                value={option.toLowerCase().replace(" ", "")}
              >
                {option}
              </option>
            ))}
          </select>
          <div className={classes.line}></div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Select;
