import React from "react";
import ReactPaginate from "react-paginate";
import { useCommentsAdminStore } from "../../../src/utility/context/Comments/Comments";

const CustomPagination = ({ setCurrentPage, currentPage }) => {
  const { CommentsTotalCount, rowOfPage } = useCommentsAdminStore();
  const count = Number(Math.floor(CommentsTotalCount / rowOfPage) + 1);
  const handlePagination = (selectedVal) => {
    setCurrentPage(selectedVal.selected + 1);

    console.log(count);
  };

  return (
    <ReactPaginate
      previousLabel={""}
      nextLabel={""}
      pageCount={count || 1}
      activeClassName="active"
      forcePage={currentPage !== 0 ? currentPage - 1 : 0}
      onPageChange={(page) => handlePagination(page)}
      pageClassName={"page-item"}
      nextLinkClassName={"page-link"}
      nextClassName={"page-item next"}
      previousClassName={"page-item prev"}
      previousLinkClassName={"page-link"}
      pageLinkClassName={"page-link"}
      containerClassName={
        "pagination react-paginate justify-content-center my-2 pe-1"
      }
    />
  );
};

export { CustomPagination };
