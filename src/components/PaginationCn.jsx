import React, { useState } from "react";
import { PropTypes } from "prop-types";
import ReactPaginate from "react-paginate";
import { RiArrowRightDoubleLine } from "react-icons/ri";
import { RiArrowLeftDoubleLine } from "react-icons/ri";

export default function PaginationCn({
  totalPages,
  currentPage,
  onChangePage,
}) {
  const maxTotalPages = totalPages >= 500 ? 500 : totalPages;

  if (totalPages > 1) {
    const handlePageClick = (page) => {
      if (currentPage === page.selected + 1) {
        return;
      }
      onChangePage(page.selected + 1);
    };

    return (
      <div className="container-fluid my-5">
        <ReactPaginate
          previousLabel={<RiArrowLeftDoubleLine />}
          nextLabel={<RiArrowRightDoubleLine />}
          breakLabel={"..."}
          pageCount={maxTotalPages}
          marginPagesDisplayed={1}
          pageRangeDisplayed={2}
          onPageChange={handlePageClick}
          containerClassName={"pagination justify-content-center"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          activeClassName={"active"}
        />
      </div>
    );
  }
  return null;
}

PaginationCn.propTypes = {
  totalPages: PropTypes.number,
  currentPage: PropTypes.number,
  onChangePage: PropTypes.func,
};
