import React, { useRef } from "react";
import PropTypes from "prop-types";

export default function SearchBar({ query, setQuery, clickEv }) {
  const inpSearchRef = useRef();
  const handlClick = () => {
    setQuery(inpSearchRef.current.value);
    clickEv(inpSearchRef.current.value, 1);
  };
  return (
    <div>
      <nav className="search-bar mb-5" role="search">
        <div className="input-search_container">
          <input
            type="text"
            name="text"
            className="input"
            placeholder="search..."
            value={query}
            ref={inpSearchRef}
          />
          <span className="icon" onClick={handlClick}>
            <svg
              width="19px"
              height="19px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="1"
                d="M14 5H20"
                stroke="#000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                opacity="1"
                d="M14 8H17"
                stroke="#000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M21 11.5C21 16.75 16.75 21 11.5 21C6.25 21 2 16.75 2 11.5C2 6.25 6.25 2 11.5 2"
                stroke="#000"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                opacity="1"
                d="M22 22L20 20"
                stroke="#000"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </span>
        </div>
      </nav>
    </div>
  );
}

SearchBar.propTypes = {
  query: PropTypes.string,
  setQuery: PropTypes.func.isRequired,
  clickEv: PropTypes.func.isRequired,
};
