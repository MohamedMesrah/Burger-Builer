import React from "react";
import classes from "./sideDrawer.module.css";
import Button from "../../UI/button/button";
import BackDrop from "../../UI/backDrop/backDrop";
import MenuIcon from "../../UI/icons/menu/menu";

const SideDrawer = ({ show, children, onClick, onBackDropCancel }) => {
  return (
    <div className={classes.hide}>
      <Button btnType="menu" onClick={onClick}>
        <MenuIcon />
      </Button>
      <div
        className={classes.sideDrawer}
        style={{
          transform: show ? "translateX(0)" : "translateX(-400vh)"
        }}
      >
        {children}
      </div>
      <BackDrop show={show} onBackDropCancel={onBackDropCancel}></BackDrop>
    </div>
  );
};

export default SideDrawer;
