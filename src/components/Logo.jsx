import React from "react";
import appLogo from "../assets/appLogo.png";
export default function Logo() {
  return (
    <div className="logo">
      <img src={appLogo} width={50} height={50} alt="" />
    </div>
  );
}
