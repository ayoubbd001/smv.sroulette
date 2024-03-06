import axios from "axios";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import reviewMvAPi from "../Apis/reviewsApi";
import { Spinner, Tab, Tabs } from "react-bootstrap";
import Review from "./review";
import { myAPi } from "../Apis/ApiKey";
import Sliders from "./Sliders";

export default function PackagingRvRc({ mv_id }) {
  const [activeTab, setActiveTab] = useState(null);
  const [tabData, setTabData] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchTabData = async (endpoint) => {
    try {
      const response = await axios.get(endpoint);
      return response.data.results;
    } catch (err) {
      return null;
    }
  };

  useEffect(() => {
    setActiveTab(0);
    const fetch_iniRvTab = async () => {
      const reviewEndpoint = reviewMvAPi.replace("{movie_id}", mv_id);
      const response = await fetchTabData(reviewEndpoint);

      if (response) {
        setTabData({ 0: response });
        setLoading(false);
      }
    };
    fetch_iniRvTab();
  }, [mv_id]);

  const handleTabSelect = async (selectedTab) => {
    setActiveTab(selectedTab);
    const tab = tabData[selectedTab];
    if (!tab) {
      const recommendation_mv =
        `https://api.themoviedb.org/3/movie/{movie_id}/recommendations?language=en-US&page=1&api_key=${myAPi}`.replace(
          "{movie_id}",
          mv_id
        );

      const rc_mv = await fetchTabData(recommendation_mv);
      if (rc_mv) {
        setTabData((prv) => ({
          ...prv,
          [selectedTab]: rc_mv,
        }));
      }
    }
  };

  return (
    <div className="p-3 mb-5">
      <h3 className="heading-2 mb-4">Reviews & Suggestions</h3>
      <Tabs
        activeKey={activeTab}
        onSelect={handleTabSelect}
        fill
        className="my-5"
      >
        <Tab eventKey={0} title="Reviews" className="tab-pane_f">
          {loading ? (
            <div className="text-center mt-2">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            <div>
              {tabData[0] && tabData[0].length !== 0 ? (
                tabData[0].map((rv) => <Review review_data={rv} key={rv.id} />)
              ) : (
                <p
                  style={{
                    color: "red",
                    letterSpacing: "2px",
                    fontWeight: "600",
                  }}
                >
                  sorry no reviews for this movie
                </p>
              )}
            </div>
          )}
        </Tab>
        <Tab eventKey={1} title="Suggestions">
          {tabData[1] ? (
            <div>{<Sliders suggs={tabData[1]} />}</div>
          ) : tabData[1] && tabData[1].length === 0 ? (
            <p
              style={{
                color: "red",
                letterSpacing: "2px",
                fontWeight: "600",
              }}
            >
              sorry no suggestions for this movie
            </p>
          ) : (
            <div className="text-center mt-2">
              <Spinner animation="border" variant="primary" />
            </div>
          )}
        </Tab>
      </Tabs>
    </div>
  );
}

PackagingRvRc.proptypes = {
  mv_id: PropTypes.number,
};
