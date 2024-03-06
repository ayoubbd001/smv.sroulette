import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import PropTypes from "prop-types";
import PaginationCn from "./PaginationCn";

export default function SearchResult({
  res,
  currentPage,
  totalPages,
  onChange_Page,
}) {
  const [currPage, setCurrPage] = useState(1);
  return (
    <div id="search_result">
      <div className="container">
        <div className="row">
          {res.map((movie) => (
            <div key={movie.id} className="col-xl-3 col-sm-6 col-md-4 col-xs-6">
              <MovieCard movie={movie} show_allInfo={true} />
            </div>
          ))}
        </div>
      </div>
      <div className="paginationContainer">
        <PaginationCn
          currentPage={currentPage}
          totalPages={totalPages}
          onChangePage={onChange_Page}
        />
      </div>
    </div>
  );
}

SearchResult.propTypes = {
  res: PropTypes.array.isRequired,
  totalPages: PropTypes.number,
  currentPage: PropTypes.number,
  onChange_Page: PropTypes.func,
};
