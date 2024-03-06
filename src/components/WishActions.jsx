import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import { BiCheckbox } from "react-icons/bi";
import { BiCheckboxMinus } from "react-icons/bi";
import { BiCheckboxChecked } from "react-icons/bi";
import { useDispatch } from "react-redux";
// import { removeFromWishlist, updateMovie } from "../features/WishListSlice";
import { showAlertAsync } from "../features/AlertsSlice";

export default function WishActions({
  checkedItems,
  handlcheckAll,
  allChecked,
  iniCheckedItem,
  updateMv,
  delMv,
  disabledFi,
}) {
  const dispatch = useDispatch();

  function isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }
  const toggleCheck = () => {
    if (disabledFi) {
      return;
    }
    handlcheckAll();
  };

  const handleDelete = (ids) => {
    if (isEmpty(checkedItems)) {
      dispatch(
        showAlertAsync({
          message: "select movie before proccesed an action",
          type: "info",
        })
      );
      return;
    }
    delMv(ids);
    iniCheckedItem({});
  };

  const handleUpdate = (ids) => {
    if (isEmpty(checkedItems)) {
      dispatch(
        showAlertAsync({
          message: "select movie before proccesed an action",
          type: "info",
        })
      );
      return;
    }
    // dispatch(updateMovie(ids));
    updateMv(ids);
    iniCheckedItem({});
  };

  return (
    <div className="box_actions">
      <Dropdown as={ButtonGroup}>
        <Button className="check_box_items_act" onClick={toggleCheck}>
          {allChecked ? (
            <BiCheckboxChecked style={{ width: "18px", height: "18px" }} />
          ) : isEmpty(checkedItems) ? (
            <BiCheckbox style={{ width: "18px", height: "18px" }} />
          ) : (
            <BiCheckboxMinus style={{ width: "18px", height: "18px" }} />
          )}
        </Button>
        <Dropdown.Toggle split className="check_box_items_act" />
        <Dropdown.Menu className="super-colors">
          <Dropdown.Item eventKey="1" disabled>
            Action
          </Dropdown.Item>
          <Dropdown.Divider></Dropdown.Divider>
          <Dropdown.Item
            eventKey="2"
            onClick={() => handleDelete(checkedItems)}
          >
            Delete{" "}
            {allChecked && Object.keys(checkedItems).length > 1
              ? "All"
              : "Movies Selected"}
          </Dropdown.Item>
          <Dropdown.Item
            eventKey="3"
            onClick={() => handleUpdate(checkedItems)}
          >
            {"Change watch status"}
          </Dropdown.Item>
          <Dropdown.Divider />
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

WishActions.propTypes = {
  checkedItems: PropTypes.object,
  handlcheckAll: PropTypes.func,
  allChecked: PropTypes.bool,
  iniCheckedItem: PropTypes.func,
  updateMv: PropTypes.func,
  delMv: PropTypes.func,
  disabledFi: PropTypes.bool,
};
