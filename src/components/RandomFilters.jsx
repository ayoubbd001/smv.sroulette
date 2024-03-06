import React, { useState, useEffect } from "react";
import { movieGenres, tvGenres } from "../utils/genres";
import Switch from "react-switch";

export default function RandomFilters({ handlefilterChange, filterParams }) {
  const [vdFormat, setVdFormat] = useState(filterParams[1]);
  const [genreName, setGenreName] = useState(filterParams[0]);
  const [quality, setQuality] = useState(filterParams[2]);
  const [activeGenres, setActiveGenres] = useState(movieGenres);
  const [toggle1, setToggle1] = useState(false);
  const [toggle2, setToggle2] = useState(false);

  useEffect(() => {
    const selectedVideoFormat = toggle1 ? "tv" : "movies";
    if (selectedVideoFormat !== vdFormat) {
      const newGenres =
        selectedVideoFormat === "movies" ? movieGenres : tvGenres;
      setActiveGenres(newGenres);
      setGenreName("All Genres");
      setVdFormat(selectedVideoFormat);
      handlefilterChange({ ...filterParams, vdFormat: selectedVideoFormat });
    }
  }, [toggle1]);
  useEffect(() => {
    const selectedQuality = toggle2 ? "bad" : "good";
    if (selectedQuality !== quality) {
      setQuality(selectedQuality);
      handlefilterChange({ ...filterParams, quality: selectedQuality });
    }
  }, [toggle2]);

  const handleChangeGenre = (gn) => {
    setGenreName(gn);
    handlefilterChange({ ...filterParams, genre: gn });
  };


  return (
    <>
      <div className="res-filters mt-5">
        <div className="res-filter res-filter-genre">
          <small style={{ textAlign: "start" }}>
            <FilterText videoFormat={vdFormat} />
          </small>
          <br />
          <select
            className="res-select form-select mt-1"
            name="genre"
            id="genre-select"
            value={genreName}
            onChange={(e) => handleChangeGenre(e.target.value)}
          >
            {activeGenres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>
        <div className="res-filter">
          <label className="filter-switch ">
            <span className="filter-name">Movies/Tv</span>
            <Switch
              onChange={(nextValue) => setToggle1(nextValue)}
              checked={toggle1}
              onColor="#0f3d64"
              offColor="#0f3d64"
              onHandleColor="#fff"
              offHandleColor="#fff"
              handleDiameter={30}
              uncheckedIcon={false}
              checkedIcon={false}
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              height={20}
              width={48}
              uncheckedHandleIcon={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    fontSize: 16,
                  }}
                >
                  🎥
                </div>
              }
              checkedHandleIcon={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    fontSize: 16,
                  }}
                >
                  📺
                </div>
              }
            />
          </label>
        </div>
        <div className="res-filter">
          <label className="filter-switch">
            <span className="filter-name">Quality</span>
            <Switch
              onChange={(nextValue) => setToggle2(nextValue)}
              checked={toggle2}
              onColor="#0f3d64"
              offColor="#0f3d64"
              onHandleColor="#fff"
              offHandleColor="#fff"
              handleDiameter={30}
              uncheckedIcon={false}
              checkedIcon={false}
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              height={20}
              width={48}
              uncheckedHandleIcon={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    fontSize: 16,
                  }}
                >
                  👍
                </div>
              }
              checkedHandleIcon={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    fontSize: 16,
                  }}
                >
                  👎
                </div>
              }
            />
          </label>
        </div>
      </div>
    </>
  );
}

const FilterText = ({ videoFormat }) => {
  const filterText =
    videoFormat === "movies" ? "show movie in :" : "show tv in :";
  return filterText;
};
