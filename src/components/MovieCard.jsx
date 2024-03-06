import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist } from "../features/WishListSlice";
import { GoMultiSelect } from "react-icons/go";
import imgLocation from "../Apis/imgLocation";
import { useNavigate } from "react-router-dom";
import RatedCountChart from "./RatedCountChart";
import TrailerModal from "./TrailerModal";
import axios from "axios";
import trailerApi from "../Apis/trailersAPi";
import useDateFormat from "./customDate";

export default function MovieCard({ movie, show_allInfo }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const format_date = movie.release_date
    ? // eslint-disable-next-line react-hooks/rules-of-hooks
      useDateFormat(movie.release_date)
    : "";

  const [showOptions, setShowOptions] = useState(false);
  const hasFirstWish = useSelector((state) => state.wishlist.myWish.length);

  const [showTrailerModal, setShowTrlModal] = useState(false);

  const [trailersData, setTrailersData] = useState([]);

  const addMovie = (movieId, movieTitle, movieImage) => {
    dispatch(
      addToWishlist({
        movie: {
          id: movieId,
          title: movieTitle,
          image_path: movieImage,
        },
        mustShowAlert: true,
      })
    );
  };

  const handlAdd = () => {
    addMovie(movie.id, movie.title, movie.poster_path);
    setShowOptions((opt) => !opt);
    hasFirstWish === 0 &&
      setTimeout(() => {
        navigate("/wishList");
      }, 1500);
  };

  const toMovieDetail = () => {
    navigate(`/Movie/${movie.id}`);
  };


  const getTrailers = async (mvId) => {
    const response = await axios.get(trailerApi.replace("{movie_id}", mvId));
    const mv_trailers = await response.data.results;

    setTrailersData(mv_trailers);
    setTimeout(() => {
      setShowTrlModal(true);
    }, 100);
  };
  return (
    <div className={`card crs-rs rounded my-2 ${showOptions && "showBgCard"}`}>
      <div className="box_watchTrialer_btn">
        <button
          className="btn btn-showMd"
          onClick={() => getTrailers(movie.id)}
        >
          Watch trailer
        </button>
      </div>
      <div className="card-image mb-2">
        <button
          id="btn-addTowish"
          className="btn p-2 rounded"
          onClick={() => {
            setShowOptions((opt) => !opt);
          }}
        >
          <GoMultiSelect />
        </button>

        <div className={`optionsMovie ${showOptions && "showOpt"} `}>
          <div className="k-tooltip-content">
            <div className="settings_content p-2">
              <div className="group no_pad">
                <p
                  className="my-1 py-1 px-2"
                  style={{ borderTop: "1px solid #ddd" }}
                >
                  <a className="no_click" onClick={toMovieDetail}>
                    <span className="glyphicons_v2 thumbnails-list pad_right"></span>{" "}
                    Movie Detail
                  </a>
                </p>
              </div>
              <div className="group no_pad">
                <p className="my-1 py-1 px-2">
                  <a className="no_click" onClick={handlAdd}>
                    <span className="glyphicons_v2 heart pad_right"></span> Add
                    To Wish List
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
        {movie.poster_path !== null ? (
          <img
            src={imgLocation + "" + movie.poster_path}
            alt=""
            className="card-img-top"
          />
        ) : (
          <div className="image_placeholder"></div>
        )}
      </div>
      {show_allInfo && (
        <>
          <h6 className="card-title mb-2 p-2">{movie.title}</h6>
          <div className="card-info d-flex justify-content-between p-2">
            <p className="p-2" style={{ color: "#888" }}>
              {format_date}
            </p>
            {movie.vote_average > 0 && (
              <div className="avgRate">
                <RatedCountChart
                  value={parseInt(movie.vote_average * 10)}
                  maxValue={100}
                />
              </div>
            )}
          </div>
        </>
      )}

      <TrailerModal
        trailers={trailersData}
        isShow={showTrailerModal}
        handleShow={setShowTrlModal}
        mv_title={movie.title}
      />
    </div>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    poster_path: PropTypes.string,
    release_date: PropTypes.string,
    vote_average: PropTypes.number,
  }).isRequired,
  show_allInfo: PropTypes.bool,
};
