import React from "react";
import { Pagination } from "@polyutils/components";
import LoadingOverlay from "./LoadingOverlay";

type Props = {
  toolbar: React.ReactNode;
  children: React.ReactNode;
  isDeleting: boolean;
  creating: boolean;
  totalPages: number;
  currentPage: number;
  setPage: (page: number) => void;
  confirmModal?: React.ReactNode;
  addEditModal?: React.ReactNode;
};

export default function ListLayout({
  toolbar,
  children,
  isDeleting,
  creating,
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
        styles={{
            button: {
                border: "1px solid var(--border)",
                background: "var(--card)",
                color: "var(--text)",
            },
            buttonActive: {
                background: "color-mix(in srgb, var(--main-orange) 18%, var(--arrow-bg))",
                borderColor: "color-mix(in srgb, var(--main-orange) 40%, var(--border))",
            },
            ellipsis: { color: "var(--muted)" },
        }}/>
      <LoadingOverlay open={isDeleting} label="Deleting item" />
      <LoadingOverlay open={creating} label="Creating item" />
      {confirmModal}
      {addEditModal}
    </>
  );
}
