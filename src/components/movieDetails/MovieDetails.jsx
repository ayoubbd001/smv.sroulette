import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import detailsMvApi from "../../Apis/detailsMovie";
import { myAPi } from "../../Apis/ApiKey";
import BannerDt from "../BannerDt";
import Spinner from "react-bootstrap/Spinner";
import PackagingRvRc from "../PackagingRvRc";
import { Link } from "react-router-dom";

export default function MovieDetails() {
  const { id } = useParams();

  let [mvId, setMvId] = useState(0);

  useEffect(() => {
    setMvId(id);
  }, [id]);

  const navigate = useNavigate();

  function containsAlphabetic(id) {
    var regex = /[a-zA-Z]/;
    return regex.test(id);
  }

  if (containsAlphabetic(id)) {
    navigate("/e-404");
  }

  const [details, setDetais] = useState(null);
  const [isError, setIsError] = useState(false);
  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    const getDetails = async (mvId) => {
      try {
        setIsLoading(true);
        const fetchedDetails = await axios.get(
          `${detailsMvApi}${mvId}?language=en-US&api_key=${myAPi}`
        );

        const result = await fetchedDetails.data;
        setDetais(result);
        setIsLoading(false);
      } catch (err) {
        console.error("error: ", err);
        setIsError(true);
        setIsLoading(false);
      }
    };

    getDetails(mvId);
  }, [mvId]);

  return (
    <>
      <nav aria-label="breadcrumb" className="my-2 p-2">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Movies
          </li>

          <li className="breadcrumb-item active" aria-current="page">
            {mvId}
          </li>
        </ol>
      </nav>
      {loading && (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      )}
      {details && (
        <>
          <BannerDt details={details} />{" "}
        </>
      )}

      <div className="mt-5 mb-5">
        <div className="container rv-rec-section">
          <PackagingRvRc mv_id={mvId} />
        </div>
      </div>
    </>
  );
}
