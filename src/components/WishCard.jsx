import React from "react";
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";
import imgLocation from "../Apis/imgLocation";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

export default function WishCard({ movie, handleCheck, checkedItems }) {
  return (
    <div className="card-wish my-3">
      <div className="card-image p-relative">
        <img
          src={`${imgLocation}${movie.image_path}`}
          className="card-img-top"
          height={200}
          alt=""
          style={{ objectFit: "contains" }}
        />
        <span className="ws_movie_state">
          {movie.watched ? <FaEye /> : <FaEyeSlash />}
        </span>
      </div>

      <div className="card-content row p-3">
        <div className="col-2">
          <Form.Check
            aria-label="to_Action"
            checked={checkedItems[movie.id] || false}
            onChange={() => handleCheck(movie.id)}
          />
        </div>
        <div className="col-10">
          <p
            className="text-small text-end"
            style={{ fontWeight: "bold", letterSpacing: "1px" }}
          >
            {movie.title}
          </p>
          <p className="text-end" style={{ color: "#888" }}>
            {movie.dateAdd}
          </p>
        </div>
      </div>
    </div>
  );
}

WishCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    image_path: PropTypes.string,
    watched: PropTypes.bool,
    dateAdd: PropTypes.string,
  }).isRequired,
  handleCheck: PropTypes.func,
  checkedItems: PropTypes.object,
};
