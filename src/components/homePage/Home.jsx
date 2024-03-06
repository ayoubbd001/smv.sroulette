import React, { useState } from "react";
import RandomFilters from "../RandomFilters";
import discoverMvs from "../../Apis/discoverUrls/movies_api";
import discoverTv from "../../Apis/discoverUrls/tv_api";
import axios from "axios";
import Roulette from "../Roulette";
import Result from "../Result";
import SearchSpinner from "../SearchSpinner";

export default function Home() {
  const [previousMovies, setPreviousMovies] = useState(new Set());
  const [randomMovie, setRandomMovie] = useState(null);
  const [filterParams, setFilterParams] = useState({
    genre: 0,
    vdFormat: "movies",
    quality: "good",
  });

  const [randomClicks, setRandomClicks] = useState(0);
  const [page, setPage] = useState(1);

  const [isLoading, setIsLoading] = useState(false);

  const [isError, setIsError] = useState(false);

  // const [finishedSpin, setFinishedSpin] = useState(false);

  const retrieveRandomMovie = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      if (randomClicks >= 19) {
        setPage((prevPage) => prevPage + 1);
        setRandomClicks(0);
      }

      /*eslint no-constant-condition: ["error", { "checkLoops": false }]*/
      while (true) {
        const movie = await getRandomMovieFromAPI(filterParams);

        if (!previousMovies.has(movie.id)) {
          setRandomMovie(movie);
          setPreviousMovies(new Set([...previousMovies, movie.id]));
          setRandomClicks((prevClicks) => prevClicks + 1);

          break;
        }
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error retrieving random movie:", error);
    }
  };

  const getRandomMovieFromAPI = async (params) => {
    try {
      setIsError(false);

      let vote_param =
        params.quality === "good" ? "vote_average.gte" : "vote_average.lte";

      let params_api = {
        with_genres: params.genre === 0 ? "" : params.genre,
        [vote_param]: 5,
      };

      let discover_url = getUrlFormatVd(params.vdFormat);
      const response = await axios.get(discover_url, {
        params: { ...params_api, page },
      });
      const randomIndex = Math.floor(
        Math.random() * response.data.results.length
      );
      return response.data.results[randomIndex];
    } catch (error) {
      setIsError(true);

      console.error("Error fetching random movie:", error);
      throw error;
    }
  };

  const handleFilterChange = (newParams) => {
    setFilterParams(newParams);

    if (randomClicks !== 0 && page >= 1) {
      setPage(1);
      setRandomClicks(0);
    }
  };

  const getUrlFormatVd = (frm) => {
    return frm === "movies" ? discoverMvs : discoverTv;
  };

  return (
    <div id="Home_Page" className="mb-5 mt-5 ps-1 pe-1">
      <h2 className="heading-p text-center pe-md-5">SMv's™ Roulette</h2>

      <div className="random_filters mb-5">
        <RandomFilters
          handlefilterChange={handleFilterChange}
          filterParams={filterParams}
        />
      </div>
      <div id="randomSec" className="mt-5">
        <div className="container mt-2 p-2">
          <div className="row flex-wrap-reverse">
            <div className="roulette_box  col-xl-3 my-2 ">
              <Roulette
                fetch_mvRandomly={retrieveRandomMovie}
                setIsLoad={setIsLoading}
              />
            </div>
            <div className="col-xl-9 my-2">
              <div className="result-intro">
                {!randomMovie && !isLoading && !isError && (
                  <p className="desc-app p-2" title="our vision">
                    {`Introducing our user-friendly app, the perfect solution for
                    your "What can I watch this night?" . Our app simplifies
                    movie and TV series discovery with just one click on the
                    spin button. Experience the joy of finding your next
                    favorite show or film effortlessly, as our platform delivers
                    random recommendations tailored to your taste. Get ready to
                    unwind and enjoy a seamless movie night with our app's
                    engaging and time-saving features.`}
                  </p>
                )}

                {isLoading && (
                  <div className="d-flex justify-content-center align-items-center my-5">
                    <SearchSpinner />
                  </div>
                )}

                {!isLoading && randomMovie && (
                  <div className="result_banner">
                    <Result
                      movie={randomMovie}
                      vdFormat={filterParams.vdFormat}
                    />
                  </div>
                )}

                {isError && !isLoading && (
                  <p className="text-center fs-4 m-5">
                    failed to fetch movie try again
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
