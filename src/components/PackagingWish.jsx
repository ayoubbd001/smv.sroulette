import React, { useEffect, useState } from "react";
import PropTypes, { object } from "prop-types";
import imgLocation from "../Apis/imgLocation";
import WishCard from "./WishCard";
import WishFilters from "./WishFilters";
import WishActions from "./WishActions";
import { useDispatch } from "react-redux";
import { removeFromWishlist, updateMovie } from "../features/WishListSlice";
export default function PackagingWish({
  wish_Movies,
  checkedItems,
  setCheckedItems,
}) {
  const disptach = useDispatch();
  const [sortBy, setSortBy] = useState("Date Creation");

  const [sortedList, setSortedList] = useState([]);

  useEffect(() => {
    let sortedList_ = [...wish_Movies];
    if (sortBy.toLocaleLowerCase() === "date creation") {
      sortedList_ = [...wish_Movies].reverse();
    } else if (sortBy.toLocaleLowerCase() === "title") {
      sortedList_ = [...wish_Movies].sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    } else if (sortBy.toLocaleLowerCase() === "watched") {
      sortedList_ = [...wish_Movies].sort((a, b) =>
        a.watched === b.watched ? 0 : a.watched ? -1 : 1
      );
    } else if (sortBy.toLocaleLowerCase() === "unwatched") {
      sortedList_ = [...wish_Movies].sort((a, b) =>
        a.watched === b.watched ? 0 : a.watched ? 1 : -1
      );
    }
    setSortedList(sortedList_);
  }, [sortBy, wish_Movies]);

  const handleCheckboxChange = (id) => {
    setCheckedItems((prevState) => {
      const updatedCheckedItems = { ...prevState, [id]: !prevState[id] };
      if (!updatedCheckedItems[id]) {
        delete updatedCheckedItems[id];
      }
      return updatedCheckedItems;
    });
  };

  const isAllChecked =
    Object.keys(checkedItems).length === sortedList.length &&
    Object.keys(checkedItems).length > 0;

  const disableSort = sortedList.length === 0;

  const makeAllMovieschecked = () => {
    if (!isAllChecked) {
      const newCheckedItems = {};
      for (let i = 0; i < sortedList.length; i++) {
        const { id } = sortedList[i];
        Object.assign(newCheckedItems, { [id]: true });
      }
      setCheckedItems(newCheckedItems);
    } else {
      setCheckedItems({});
    }
  };

  const handleDelete = () => {
    disptach(
      removeFromWishlist({ moviesIds: checkedItems, mustShowAlert: true })
    );
  };

  const handleUpdate = () => {
    disptach(updateMovie(checkedItems));
  };

  return (
    <div id="packagingWish" className="container mt-5">
      <div className="row">
        <div className="col-sm-6 col-xs-6">
          <div className="box_filters">
            <WishFilters
              setOrderBy={setSortBy}
              orderBy={sortBy}
              initItemsChecked={setCheckedItems}
              disabledFi={disableSort}
            />
          </div>
        </div>
        <div className="col-sm-6 col-xs-6">
          <WishActions
            checkedItems={checkedItems}
            handlcheckAll={makeAllMovieschecked}
            allChecked={isAllChecked}
            iniCheckedItem={setCheckedItems}
            delMv={handleDelete}
            updateMv={handleUpdate}
            disabledFi={disableSort}
          />
        </div>
      </div>

      <div className="row">
        {sortedList.length !== 0 ? (
          sortedList.map((mv) => (
            <div
              key={mv.id}
              className="col-xl-4 col-lg-6 col-md-12 col-sm-6 col-xs-6"
            >
              <WishCard
                movie={mv}
                handleCheck={handleCheckboxChange}
                checkedItems={checkedItems}
              />
            </div>
          ))
        ) : (
          <p>+ No items in this status</p>
        )}
      </div>
    </div>
  );
}

PackagingWish.propTypes = {
  wish_Movies: PropTypes.array.isRequired,
  checkedItems: PropTypes.object,
  setCheckedItems: PropTypes.func,
};
