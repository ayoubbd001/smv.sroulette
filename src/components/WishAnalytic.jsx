import React from "react";
import { SlReload } from "react-icons/sl";
import { FiCheckCircle } from "react-icons/fi";
import { TfiReload } from "react-icons/tfi";

import PropTypes from "prop-types";

export default function WishAnalytic({
  wishtList,
  setFiltredList,
  iniMvChecked,
}) {
  const handleChangeOrder = (e) => {
    setFiltredList(e.target.getAttribute("data-wish-filter").trim());
    iniMvChecked({});
  };
  return (
    <div className="fi_ana">
      <p className="text-muted text-samll">Status</p>
      <ul className="list-unstyled mb-5">
        <li>
          <a
            className="d-block state_link"
            data-wish-filter="all"
            onClick={(e) => handleChangeOrder(e)}
          >
            <SlReload className="me-2" />
            {"All Movies"} <span className="state_num">{wishtList.length}</span>
          </a>
        </li>
        <li>
          <a
            className="d-block state_link"
            data-wish-filter="watched"
            onClick={(e) => handleChangeOrder(e)}
          >
            <FiCheckCircle className="me-2" />

            {"Watched Movies"}
            <span className="state_num">
              {wishtList.filter((movie) => movie.watched).length}
            </span>
          </a>
        </li>
        <li>
          <a
            className="d-block state_link"
            data-wish-filter="unwatched"
            onClick={(e) => handleChangeOrder(e)}
          >
            <TfiReload className="me-2" />

            {"Unwatched Movies"}
            <span className="state_num">
              {wishtList.filter((movie) => !movie.watched).length}
            </span>
          </a>
        </li>
      </ul>
    </div>
  );
}

WishAnalytic.propTypes = {
  wishtList: PropTypes.array.isRequired,
  setFiltredList: PropTypes.func,
  iniMvChecked: PropTypes.func,
};
