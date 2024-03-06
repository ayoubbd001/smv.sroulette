import React, { useState } from "react";
import SearchBar from "../searchBar";
import axios from "axios";
import SearchResult from "../SearchResult";
import { searchAPi } from "../../Apis/searchAPi";
import { myAPi } from "../../Apis/ApiKey";
import { showAlertAsync } from "../../features/AlertsSlice";
import { useDispatch } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import Breadcrumbs from "../Breadcrumbs";

export default function Search() {
  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsloading] = useState(false);

  const dispatch = useDispatch();

  const getSearchResult = async (query, page) => {
    if (query) {
      setIsloading(true);
      const fetchedMovies = await axios.get(
        `${searchAPi}&query=${query}&api_key=${myAPi}&page=${page}`
      );

      if (fetchedMovies.data.total_pages <= 1) {
        dispatch(
          showAlertAsync({ message: "No results for Search", type: "danger" })
        );
        setIsloading(false);
        setTotalPages(0);
        setSearchResult([]);
      } else {
        setIsloading(false);
        setSearchResult(fetchedMovies.data.results);
        setTotalPages(fetchedMovies.data.total_pages);
      }
    } else {
      dispatch(
        showAlertAsync({ message: "search term is required", type: "danger" })
      );
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    getSearchResult(query, page);
  };

  function handlClick(query, page) {
    setCurrentPage(page);
    getSearchResult(query, page);
  }

  return (
    <div id="searchSection" className="section">
      <div className="container">
        <Breadcrumbs />
        <div className="row justify-content-center">
          <div className="col-md-6 col-sm-8  mb-3">
            <SearchBar q={query} setQuery={setQuery} clickEv={handlClick} />

            {isLoading && (
              <div className="text-center">
                <Spinner animation="grow" />
              </div>
            )}
          </div>
          {searchResult.length !== 0 && (
            <div className="result">
              <SearchResult
                res={searchResult}
                currentPage={currentPage}
                totalPages={totalPages}
                onChange_Page={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
