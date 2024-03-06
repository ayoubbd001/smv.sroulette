import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRatedMovies } from "../../features/RatedSlice";
import MovieCard from "../MovieCard";
import Alert from "../Alert";
import PaginationCn from "../PaginationCn";
import CardPlaceholder from "../CardPlaceholder";
import Breadcrumbs from "../Breadcrumbs";

export default function Ratedmovies() {
  const isLoading = useSelector((state) => state.ratedMovies.loading);
  // const failedFetchMovies = useSelector((state) => state.ratedMovies.error);
  const [currentPage, setPage] = useState(1);
  const moviesList = useSelector((state) => state.ratedMovies.ratedmoviesList);
  const totalPages = useSelector((state) => state.ratedMovies.total_pages);
  const dispatch = useDispatch();
  const moviePlaceholderList = Array.from(
    { length: 20 },
    (_, index) => index + 1
  );

  useEffect(() => {
    dispatch(getRatedMovies(currentPage));
  }, [currentPage]);

  // const [gridModeCard, setgridModeCard] = useState("3");

  const handleChangePage = (page) => {
    setPage(page);
  };
  return (
    <div id="ratedSection" className="section">
      <div className="container">
        <Breadcrumbs />
        <h3 className="h-4-o">Top Rated Movies</h3>
        <div className="row justify-content-center flex-wrap">
          {isLoading
            ? moviePlaceholderList.map((_, index) => (
                <CardPlaceholder key={index} />
              ))
            : moviesList.map((movie) => (
                <div
                  key={movie.id}
                  className="col-xl-3 col-sm-6 col-md-4 col-xs-6"
                >
                  <MovieCard movie={movie} show_allInfo={true} />
                </div>
              ))}
        </div>

        <PaginationCn
          totalPages={totalPages}
          currentPage={currentPage}
          onChangePage={handleChangePage}
        />
      </div>
    </div>
  );
}
