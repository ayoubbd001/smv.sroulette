import React, { useState } from "react";
import PropTypes from "prop-types";
import imgLocation from "../Apis/imgLocation";
import { RxAvatar } from "react-icons/rx";

export default function Review({ review_data }) {
  const [showFullText, setSHowFullText] = useState(false);

  const slicedRvText = (text) => {
    if (text.length < 230) {
      return text;
    }
    return showFullText
      ? review_data.content
      : review_data.content.slice(0, 230);
  };

  return (
    <div className="box_review_mv d-flex gap-5 mb-3">
      <div className="user_avatar">
        {review_data.author_details.avatar_path ? (
          <img
            src={`${imgLocation + review_data.author_details.avatar_path}`}
            width={60}
            height={60}
            style={{ borderRadius: "50%" }}
            alt=""
          />
        ) : (
          <div
            style={{
              backgroundColor: "#fff",
              border: "1px solid #333",
              width: "59px",
              height: "59px",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <RxAvatar style={{ width: "45px", height: "45px", fill: "#888" }} />
          </div>
        )}
      </div>

      <div className="review-content-auth" style={{ flexBasis: "60%" }}>
        <p className="auth_rv">{review_data.author}</p>
        <p className="content_rv">
          {slicedRvText(review_data.content)}
          <span className="ms-2">
            <button
              className="btn_"
              onClick={() => setSHowFullText((prv) => !prv)}
            >
              {review_data.content.length > 230
                ? !showFullText
                  ? "show more"
                  : "hide"
                : null}
            </button>
          </span>
        </p>
      </div>

      {/* <div className="review_rate">
        {
        
        }
      </div> */}
    </div>
  );
}

Review.proptypes = {
  review_data: PropTypes.object,
};
