import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { CiHeart } from "react-icons/ci";
import { addToWishlist, removeFromWishlist } from "../features/WishListSlice";
import { FaHeart } from "react-icons/fa";

export default function TooltipBtn({ mv_id, title, img }) {
  const wishList = useSelector((state) => state.wishlist.myWish);

  const dispatch = useDispatch();
  const [isExist, setIsExist] = useState(false);

  const checkIsExist = (arr, mvId) => {
    return arr.some((mv) => mv.id === mvId);
  };

  useEffect(() => {
    const isEx = checkIsExist(wishList, mv_id);
    setIsExist(isEx);
  }, [mv_id, checkIsExist]);

  const toggleWish = () => {
    isExist
      ? dispatch(
          removeFromWishlist({
            moviesIds: { [mv_id]: true },
            mustShowAlert: false,
          })
        )
      : dispatch(
          addToWishlist({
            movie: {
              id: mv_id,
              title: title,
              image_path: img,
            },
            mustShowAlert: false,
          })
        );
  };

  return (
    <>
      <OverlayTrigger
        placement={"bottom"}
        overlay={
          <Tooltip id="tooltip-bottom-mv">
            {isExist ? "remove from wish list" : "add to wish list"}
          </Tooltip>
        }
      >
        <Button variant="secondary" className="toggleWish" onClick={toggleWish}>
          {isExist ? (
            <FaHeart style={{ fill: "red", fontSize: "24px" }} />
          ) : (
            <CiHeart style={{ fill: "#000", fontSize: "24px" }} />
          )}
        </Button>

        {/* <div className="love">
          <input id="switch" type="checkbox" />
          <label className="love-heart" aria-label="switch">
            <i className="left"></i>
            <i className="right"></i>
            <i className="bottom"></i>
            <div className="round"></div>
          </label>
        </div> */}
      </OverlayTrigger>
    </>
  );
}

TooltipBtn.proptypes = {
  img: PropTypes.string,
  mv_id: PropTypes.number,
  title: PropTypes.string,
};
