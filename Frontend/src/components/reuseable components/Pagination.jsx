import React, { useState } from "react";
import "./Pagination.css";

const Pagination = ({ arrayLenth, numberOfPost, index }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [lastPage, setLastPage] = useState(currentPage + numberOfPost);

  return (
    <>
      <div className="paginationDiv">
        <div className="pagination">
          <button
            className={
              currentPage > 0
                ? "btn paginationBtn"
                : "btn paginationBtn disabledBtn"
            }
            disabled={currentPage > 0 ? false : true}
            onClick={() => {
              setCurrentPage((preVal) => {
                index(preVal - numberOfPost, currentPage);
                return preVal - numberOfPost;
              });
              setLastPage(currentPage);
            }}
          >
            Previous
          </button>

          <button
            className={
              arrayLenth > lastPage
                ? "btn paginationBtn"
                : "btn paginationBtn disabledBtn"
            }
            disabled={arrayLenth > lastPage ? false : true}
            onClick={() => {
              setCurrentPage(lastPage);

              setLastPage((preVal) => {
                index(lastPage, preVal + numberOfPost);
                return preVal + numberOfPost;
              });
            }}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Pagination;
