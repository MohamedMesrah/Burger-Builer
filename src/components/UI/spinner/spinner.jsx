import React, { Fragment } from "react";
import classes from "./spinner.module.css";
import BackDrop from "../backDrop/backDrop";

const Spinner = ({ className }) => {
  return (
    <Fragment>
      <div className={[classes.Loader, className].join(" ")}>Loading...</div>
      <BackDrop />
    </Fragment>
  );
};

export default Spinner;
