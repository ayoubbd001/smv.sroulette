import React from "react";

import PropTypes from "prop-types";
import imgLocation from "../Apis/imgLocation";
import RatedCountChart from "./RatedCountChart";
import TooltipBtn from "./TooltipBtn";
// import { useDispatch } from "react-redux";
// import { addToWishlist } from "../features/WishListSlice";

export default function BannerDt({ details }) {
  const {
    id,
    genres,
    overview,
    poster_path,
    runtime,
    release_date,
    tagline,
    vote_average,
    title,
    backdrop_path,
  } = details;

  const getFormatHm = (mi) => {
    const hours = Math.floor(mi / 60);
    const minutes = mi % 60;

    return `${hours}h ${minutes}m`;
  };

  return (
    <div id="banner_dtmv">
      <article className="container">
        <h3 className="heading-2 mb-5 mt-3">Movie informations</h3>

        <div className="row">
          <div className="col-lg-4">
            <div className="card-dt">
              <img src={imgLocation + poster_path} alt="" className="img" />
            </div>
          </div>
          <div className="col-lg-8">
            <div className="p-2 mv_title mb-3">
              <h2>{title}</h2>
            </div>
            <div className="facts mb-3">
              <div className="release">
                <span>Release date : </span>
                {release_date}
              </div>
              <div className="genres">
                {
                  // eslint-disable-next-line react/prop-types
                  genres.map((gn) => (
                    <span className="gn_mv" key={gn.id}>
                      {gn.name}
                    </span>
                  ))
                }
              </div>
              <div className="runtime">
                <span>Runtime : </span>
                {getFormatHm(runtime)}
              </div>
            </div>

            <div className="rate_actions mb-3">
              <div className="row">
                <div className="col-md-6">
                  <div className="rt_avg">
                    <RatedCountChart
                      maxValue={100}
                      value={parseInt(vote_average * 10)}
                    />
                    <span>Users Rates</span>
                  </div>
                </div>
                <div className="col-md-6 d-flex align-items-center">
                  <div className="action">
                    <TooltipBtn mv_id={id} img={poster_path} title={title} />
                  </div>
                </div>
              </div>
            </div>

            <div className="tg-line">
              <p>{tagline}</p>
            </div>

            <div className="desc">
              <p>{overview}</p>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

BannerDt.proptypes = {
  details: PropTypes.object,
};
