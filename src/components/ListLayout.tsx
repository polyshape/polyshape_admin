import React from "react";
import { Pagination } from "@polyutils/components";

type Props = {
  toolbar: React.ReactNode;
  children: React.ReactNode;
  totalPages: number;
  currentPage: number;
  setPage: (page: number) => void;
  confirmModal?: React.ReactNode;
  addEditModal?: React.ReactNode;
};

export default function ListLayout({
  toolbar,
  children,
  totalPages,
  currentPage,
  setPage,
  confirmModal,
  addEditModal,
}: Props) {
  return (
    <>
      {toolbar}
      {children}
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setPage={setPage}
        delta={2}
      />
      {confirmModal}
      {addEditModal}
    </>
  );
}

