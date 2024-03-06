import React, { useState } from "react";
import PropTypes from "prop-types";
import Suggestion from "./Suggestion";

export default function Sliders({ suggs }) {
  const [scrGt_zr, setIsScrGt_zr] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  let timeout;

  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  };

  const handleScroll = debounce((ev) => {
    const target = ev.target;

    setIsScrGt_zr(target.scrollLeft > 0);
    setIsScrolling(true);

    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setIsScrolling(false);
    }, 100);
  }, 100);

  //The handleScroll function is debounced with
  // a delay of 100 milliseconds.
  // This means that when handleScroll is called
  // multiple times within 100 milliseconds,
  //only the last call will result in the actual
  //execution of the function, reducing the
  // frequency of function
  // calls and improving performance.

  return (
    <div
      className={`slider_suggs ${scrGt_zr ? "has_scroll" : ""}`}
      onScroll={handleScroll}
    >
      <div className="slides_">
        {suggs.map((sugg, index) => (
          <Suggestion key={index} sugg={sugg} hasScroll={isScrolling} />
        ))}
      </div>
    </div>
  );
}

Sliders.proptypes = {
  suggs: PropTypes.array.isRequired,
};
