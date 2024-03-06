import React from "react";
import Logo from "./Logo";

export default function Header() {
  return (
    <div
      id="header"
      className="container d-flex justify-content-around"
      style={{ padding: "10px", backgroundColor: "#fff" }}
    >
      <Logo />

      <div className="btn_nav_show"></div>
    </div>
  );
}
