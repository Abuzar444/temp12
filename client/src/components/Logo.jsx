import React from "react";
import logo from "../assets/images/RSE Logo.png";
import logo2 from "../assets/images/RSE blue.png";
import { checkDefaultTheme } from "../App";

const Logo = ({ style }) => {
  console.log("Hey I am here", checkDefaultTheme());

  if (checkDefaultTheme() === true) {
    return <img src={logo} alt="" className="logo" style={style} />;
  } else {
    return <img src={logo2} alt="" className="logo" style={style} />;
  }
};

export default Logo;
