import {
  faChevronCircleLeft,
  faChevronCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from "lodash";
import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import "./Pagination.css";

export default function Pagination({
  currentPage,

  setpaginatedData,
  countryData,
  setcurrentPage,
  pageSize,
  setpageSize,
}) {
  var pageCount =
    countryData.length > 0 ? Math.ceil(countryData.length / pageSize) : 0;
  const pages = pageCount ? _.range(1, pageCount + 1) : 0;

  const paginate = (pageNo) => {
    setcurrentPage(pageNo);
    const statrPage = (pageNo - 1) * pageSize;
    setpaginatedData(countryData.slice(statrPage, statrPage + pageSize));
  };

  const handleNext = () => {
    if (currentPage < pageCount) {
      paginate(currentPage + 1);
    } else {
      paginate(1);
    }
  };
  const handleBack = () => {
    if (currentPage <= 1) {
      paginate(pageCount);
    } else {
      paginate(currentPage - 1);
    }
  };
  const handlePageNumber = (value) => {
    // if (!value >= -1) {
    //   setcurrentPage(1);
    //   paginate(1);
    // } else {
    //     if (!value <= pageCount) {
    //       setcurrentPage(pageCount);
    //       paginate(pageCount);
    //     } else {
    //   setcurrentPage(value);
    paginate(value);
    //     }
    // }
  };

  const handlePageSize = (value) => {
    if (value > 0) {
      setpageSize(value);
    }
  };

  return (
    <div>
      <nav>
        {/* <ul className="pagination"> */}
        <div className="pagination-container">
          <FontAwesomeIcon icon={faChevronCircleLeft} onClick={handleBack} />
          <p>
            {currentPage} of {pageCount}
          </p>
          <FontAwesomeIcon icon={faChevronCircleRight} onClick={handleNext} />
          <input
            type="number"
            onChange={(e) => handlePageNumber(e.target.value)}
            value={currentPage}
          />
          <input
            type="number"
            onChange={(e) => handlePageSize(e.target.value)}
            value={pageSize}
          />
        </div>
      </nav>
    </div>
  );
}
