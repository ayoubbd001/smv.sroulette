import React, { useState } from "react";
import "../random.css";
import PropTypes from "prop-types";

export default function Roulette({ fetch_mvRandomly, setIsLoad }) {
  const [spin, setSpin] = useState(false);
  const handleSpin = async () => {
    setSpin(true);
    setIsLoad(true);

    setTimeout(() => {
      setSpin(false);
      if (!spin) {
        fetch_mvRandomly();
      }
    }, 3100);
  };
  return (
    <div className="rou-container">
      <div className={`roullete ${spin ? "loop" : ""}`}>
        {/* fill color */}
        <div className="fill fill_1"></div>
        <div className="fill fill_2"></div>
        <div className="fill fill_3"></div>
        <div className="fill fill_4"></div>
        <div className="fill fill_5"></div>
        {/* line */}
        <div className="line line_1"></div>
        <div className="line line_2"></div>
        <div className="line line_3"></div>
        <div className="line line_4"></div>
        {/* content */}
        <div className="content content_1">道</div>
        <div className="content content_2">꽝</div>
        <div className="content content_3">是</div>
        <div className="content content_4">对</div>
        <div className="content content_5">꽝</div>
        <div className="content content_6">里</div>
        <div className="content content_7">以</div>
        <div className="content content_8">꽝</div>
      </div>
      <button disabled={spin} className="trigger" onClick={() => handleSpin()}>
        Spin
      </button>
    </div>
  );
}

Roulette.proptypes = {
  fetch_mvRandomly: PropTypes.func.isRequired,
  setIsLoad: PropTypes.func.isRequired,
};
