import React, { useEffect } from "react";
import imgLocation from "../Apis/imgLocation";
import MovieCard from "./MovieCard";
import { useState } from "react";
import RatedCountChart from "./RatedCountChart";

import PropTypes from "prop-types";

export default function Result({ movie, vdFormat }) {
  const [showFullText, setSHowFullText] = useState(false);

  const [vd_fr, setVd_fr] = useState(null);

  //   const [showTrailerModal, setShowTrlModal] = useState(false);
  //   const [trailersData, setTrailersData] = useState([]);

  //   const getTrailers = async (mvId) => {
  //     const response = await axios.get(trailerApi.replace("{movie_id}", mvId));
  //     const mv_trailers = await response.data.results;

  //     setTrailersData(mv_trailers);
  //     setTimeout(() => {
  //       setShowTrlModal(true);
  //     }, 100);
  //   };

  useEffect(() => {
    setVd_fr(vdFormat);
  }, [movie]);

  const slicedRvText = (text) => {
    if (text.length < 330) {
      return text;
    }
    return showFullText ? text : text.slice(0, 230);
  };

  const resInfo = (vdFr) => {
    return (
      <div className="row">
        <div className="col-md-6">
          <h2>{vd_fr && vd_fr === "movies" ? movie.title : movie.name}</h2>
          {movie.overview ? (
            <div className="res-overview mt-3">
              <p className="content_rv">
                <span
                  style={{
                    color: "#0f3d64",
                    fontSize: "16px",
                    letterSpacing: "2px",
                    fontWeight: "600",
                  }}
                >
                  Overview :
                </span>
                <br />
                {slicedRvText(movie.overview)}
                <span className="ms-2">
                  <button
                    className="btn_"
                    onClick={() => setSHowFullText((prv) => !prv)}
                  >
                    {movie.overview.length > 330
                      ? !showFullText
                        ? "show more"
                        : "hide"
                      : null}
                  </button>
                </span>
              </p>
            </div>
          ) : (
            <p>no overview yet</p>
          )}
          {vd_fr && (
            <div className="date-rls">
              <p>
                <span
                  style={{
                    color: "#0f3d64",
                    fontSize: "16px",
                    letterSpacing: "2px",
                    fontWeight: "600",
                  }}
                >
                  {vd_fr === "tv" ? "First air date : " : "Release date : "}
                </span>
                <br />
                <span style={{ fontSize: "12.5px", color: "#555" }}>
                  {vd_fr === "tv" ? movie.first_air_date : movie.release_date}
                </span>
              </p>
            </div>
          )}

          {movie.vote_average > 0 && (
            <div className="avgRate">
              <RatedCountChart
                value={parseInt(movie.vote_average * 10)}
                maxValue={100}
              />
            </div>
          )}
        </div>
        <div className="col-md-6 res_img pt-2">
          {vdFr && vd_fr === "movies" ? (
            <MovieCard
              movie={movie}
              className="card-img-top"
              show_allInfo={false}
            />
          ) : movie.poster_path ? (
            <img
              src={`${imgLocation}${movie.poster_path}`}
              className="card-img-top rounded"
              alt=""
            />
          ) : (
            <div className="image_placeholder rounded card-img-top mt-3"></div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="radomResult">
      <article className="article">{resInfo(vd_fr)}</article>
    </div>
  );
}

Result.proptypes = {
  movie: PropTypes.object,
  vdFormat: PropTypes.string,
};
