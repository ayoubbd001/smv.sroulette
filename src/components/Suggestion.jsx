import React from "react";
import propTypes from "prop-types";
import imgLocation from "../Apis/imgLocation";
import { useState } from "react";
import { FaCalendarDays } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function Suggestion({ sugg, hasScroll }) {
  const navigate = useNavigate();
  const [showRelease, setShowRelease] = useState(false);

  const handleCLick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    navigate(`/Movie/${sugg.id}`);
  };
  return (
    <div className="sugg_card" title={sugg.title} onClick={() => handleCLick()}>
      <div
        className="img-release"
        onMouseEnter={() => setShowRelease(true)}
        onMouseLeave={() => {
          setShowRelease(false);
        }}
      >
        <img src={imgLocation + sugg.backdrop_path} alt="" />
        <div
          className={`hover_box d-flex align-items-center gap-2 ${
            showRelease && !hasScroll ? "must_fade" : ""
          }`}
        >
          <FaCalendarDays />
          <span>{sugg.release_date.replace("-", "/")}</span>
        </div>
      </div>

      <div className="sugg_info">
        <p style={{ float: "left" }}>
          {sugg.title.length > 16 ? (
            <span>
              {sugg.title.slice(0, 15)}{" "}
              <span style={{ fontWeight: "600", color: "#000" }}>. . .</span>
            </span>
          ) : (
            sugg.title
          )}
        </p>
        <p style={{ float: "right" }}>{parseInt(sugg.vote_average * 10)}%</p>
      </div>
    </div>
  );
}

Suggestion.proptypes = {
  sugg: propTypes.object,
  hasScroll: propTypes.bool,
};
