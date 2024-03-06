import React from "react";
import PropTypes from "prop-types";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
export default function WishFilters({
  orderBy,
  setOrderBy,
  initItemsChecked,
  disabledFi,
}) {
  const handlClick = (e) => {
    setOrderBy(e.target.textContent.trim());
    initItemsChecked({});
  };
  return (
    <div className="box_filters mb-5">
      <DropdownButton
        id="dropdown-basic-button"
        title={`Order By : ${orderBy}`}
        disabled={disabledFi}
      >
        <Dropdown.Item onClick={(e) => handlClick(e)}>Title</Dropdown.Item>
        <Dropdown.Item onClick={(e) => handlClick(e)}>Watched</Dropdown.Item>
        <Dropdown.Item onClick={(e) => handlClick(e)}>Unwatched</Dropdown.Item>
        <Dropdown.Item onClick={(e) => handlClick(e)}>
          Date Creation
        </Dropdown.Item>
      </DropdownButton>
    </div>
  );
}

WishFilters.propTypes = {
  orderBy: PropTypes.string,
  setOrderBy: PropTypes.func,
  initItemsChecked: PropTypes.func,
  disabledFi: PropTypes.bool,
};
