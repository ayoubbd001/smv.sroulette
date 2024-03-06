import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import WishAnalytic from "../WishAnalytic";
import PackagingWish from "../PackagingWish";
import Breadcrumbs from "../Breadcrumbs";
import { IoCloseSharp } from "react-icons/io5";
import { IoFilterOutline } from "react-icons/io5";

export default function Wishmovies() {
  const wishListMovies = useSelector((state) => state.wishlist.myWish);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});

  const [showAnalyticBar, setShowAnBar] = useState(false);

  const getFiltred = () => {
    setFilteredMovies(wishListMovies);
  };

  useEffect(() => {
    getFiltred();
  }, [wishListMovies]);

  const handleFilterChange = (filterType) => {
    switch (filterType) {
      case "all":
        setFilteredMovies(wishListMovies);
        break;
      case "watched":
        setFilteredMovies(wishListMovies.filter((movie) => movie.watched));
        break;
      case "unwatched":
        setFilteredMovies(wishListMovies.filter((movie) => !movie.watched));
        break;
      default:
        setFilteredMovies(wishListMovies);
        break;
    }
  };

  return (
    <div className="container-fluid section" id="wishList">
      <Breadcrumbs />
      <h3 className="heading ps-3">My Wish Movies</h3>
      <div className="wish_package_box">
        <div className="wish_package_box_p d-flex">
          <div className="ws-mv_box w-100 mb-5">
            {wishListMovies.length !== 0 ? (
              <PackagingWish
                wish_Movies={filteredMovies}
                checkedItems={checkedItems}
                setCheckedItems={setCheckedItems}
              />
            ) : (
              <p className=" me-2 mt-5">+ No items in wish list</p>
            )}
          </div>

          <div className="control_analytic">
            {showAnalyticBar ? (
              <button
                className="btn btn_close rounded"
                onClick={() => setShowAnBar(false)}
              >
                <IoCloseSharp />
              </button>
            ) : (
              <button
                className="btn btn_open rounded"
                onClick={() => setShowAnBar(true)}
              >
                <IoFilterOutline />
              </button>
            )}
          </div>

          <div className={`ws-stc-box ${showAnalyticBar ? "fade_bar" : ""}`}>
            <WishAnalytic
              wishtList={wishListMovies}
              setFiltredList={handleFilterChange}
              iniMvChecked={setCheckedItems}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
