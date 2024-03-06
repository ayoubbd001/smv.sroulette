import React from "react";
import { Link } from "react-router-dom";
import { GiReturnArrow } from "react-icons/gi";

export default function NotFoundPg() {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center align-items-center">
        <div className="col-lg-10 py-3 box-pg-nt">
          <div className="error-page mt-2">
            <div>
              <h1 data-h1="404">404</h1>
              <p data-p="PAGE NOT FOUND">PAGE NOT FOUND</p>
            </div>
          </div>
          <p className="text-center mt-3">
            <a href="/rated" className="back_home">
              <span>
                <GiReturnArrow />
              </span>{" "}
              go to home
            </a>
          </p>
          <div id="particles-js"></div>
        </div>
      </div>
    </div>
  );
}
