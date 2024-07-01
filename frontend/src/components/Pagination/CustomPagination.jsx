import React, { useState } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useNavigate } from "react-router-dom";

export const CustomPagination = ({
  totalItems,
  currentPage,
  setCurrentPage,
}) => {
  const totalPages = Math.ceil(totalItems / 10);
  const maxPageNumbers = 5;

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const halfMax = Math.floor(maxPageNumbers / 2);

    let startPage = currentPage - halfMax;
    let endPage = currentPage + halfMax;

    if (startPage < 1) {
      startPage = 1;
      endPage = maxPageNumbers;
    }

    if (endPage > totalPages) {
      startPage = totalPages - maxPageNumbers + 1;
      endPage = totalPages;
    }

    for (let i = startPage; i <= endPage; i++) {
      if (i > 0 && i <= totalPages) {
        pageNumbers.push(
          <PaginationItem key={i}>
            <PaginationLink
              className={`text-3xl cursor-pointer ${
                i === currentPage ? "text-black bg-white" : ""
              }`}
              onClick={() => handlePageChange(i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }

    if (startPage > 1) {
      pageNumbers.unshift(
        <PaginationItem key="ellipsis-start">
          <PaginationEllipsis className="text-3xl cursor-pointer" />
        </PaginationItem>
      );
      pageNumbers.unshift(
        <PaginationItem key={1}>
          <PaginationLink
            className={`text-3xl cursor-pointer ${
              currentPage === 1 ? "active" : ""
            }`}
            onClick={() => handlePageChange(1)}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (endPage < totalPages) {
      pageNumbers.push(
        <PaginationItem key="ellipsis-end">
          <PaginationEllipsis className="text-3xl cursor-pointer" />
        </PaginationItem>
      );
      pageNumbers.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            className={`text-3xl cursor-pointer ${
              currentPage === totalPages ? "active" : ""
            }`}
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pageNumbers;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className="text-3xl cursor-pointer"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
        </PaginationItem>
        {renderPageNumbers()}
        <PaginationItem>
          <PaginationNext
            className="text-3xl cursor-pointer"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
