import {
  faChevronCircleLeft,
  faChevronCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from "lodash";
import React, { useEffect } from "react";
import { Form } from "react-bootstrap";
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
    countryData.length > 0 ? Math.ceil(countryData?.length / pageSize) : 0;
  const pages = pageCount ? _.range(1, pageCount + 1) : 0;
  useEffect(() => {
    console.log("hellllo");
    setpaginatedData(
      countryData.slice(
        (currentPage - 1) * pageSize,
        (currentPage - 1) * pageSize + pageSize
      )
    );
  }, [countryData]);

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

  return (
    <div>
      <nav>
        {/* <ul className="pagination"> */}
        <div className="pagination-container">
          <div className="current-page-number-box">
            <FontAwesomeIcon icon={faChevronCircleLeft} onClick={handleBack} />
            <p>
              {currentPage} of {pageCount}
            </p>
            <FontAwesomeIcon icon={faChevronCircleRight} onClick={handleNext} />
          </div>
          <div className="page-number-box">
            <label className="page-number-input-label">Page number : </label>

            <Form.Select
              onChange={(e) => paginate(Number(e.target.value))}
              className="page-size-dropdown"
              value={currentPage}
            >
              {pages
                ? pages?.map((page) => {
                    return <option value={page}>{page}</option>;
                  })
                : null}
            </Form.Select>
          </div>

          <div className="page-size-box">
            <label>Page Size : </label>
            <Form.Select
              onChange={(e) => setpageSize(Number(e.target.value))}
              className="page-size-dropdown"
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
            </Form.Select>
          </div>
        </div>
      </nav>
    </div>
  );
}
