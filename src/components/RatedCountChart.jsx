import React from "react";
import PropTypes from "prop-types";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

export default function RatedCountChart({ value, maxValue }) {
  const getColor = (value) => {
    if (value <= 30) {
      return "red";
    } else if (value < 70) {
      return "orange";
    } else {
      return "green";
    }
  };

  const colorPath = getColor(value);

  return (
    <div
      style={{
        width: "50px",
        height: "50px",
        position: "relative",
      }}
    >
      <span className="rate_avg_value">{value}</span>
      <span className="rate_avg_value100">%</span>
      <CircularProgressbar
        value={value}
        maxValue={maxValue}
        styles={buildStyles({
          textColor: "#000",
          pathColor: colorPath,
          trailColor: "#ddd",
          textSize: "24px",
        })}
      />
    </div>
  );
}

RatedCountChart.propTypes = {
  value: PropTypes.number,
  maxValue: PropTypes.number,
};
