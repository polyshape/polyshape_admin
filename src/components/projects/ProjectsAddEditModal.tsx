import React from "react";
import ProjectsForm from "./ProjectsForm";
import Modal from "../Modal";
import { Button } from "@polyutils/components";

type Props = {
  open: boolean;
  creating: boolean;
  editId: string | null;
  formError: string | null;
  formTitle: string;
  setFormTitle: (v: string) => void;
  formContent: string;
  setFormContent: (v: string) => void;
  formDate: string;
  setFormDate: (v: string) => void;
  formPartnerName: string;
  setFormPartnerName: (v: string) => void;
  formPartnerUrl: string;
  setFormPartnerUrl: (v: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
  onCancel: () => void;
};

export default function ProjectsAddEditModal({
  open,
  creating,
  editId,
  formError,
  formTitle,
  setFormTitle,
  formContent,
  setFormContent,
  formDate,
  setFormDate,
  formPartnerName,
  setFormPartnerName,
  formPartnerUrl,
  setFormPartnerUrl,
  onSubmit,
  onClose,
  onCancel,
}: Props) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={editId ? "Edit project" : "Add project"}
      closeOnBackdrop={false}
      className="modal--lg"
      footer={
        <>
          <Button
            size="medium"
            shape="square"
            onClick={onCancel}
            disabled={creating}>
            Cancel
          </Button>
          <Button
            appearance="primary"
            size="medium"
            shape="square"
            form="proj-form"
            type="submit"
            disabled={creating}
            formNoValidate>
            Save
          </Button>
        </>
      }
    >
      <ProjectsForm
        formError={formError}
        formTitle={formTitle}
        setFormTitle={setFormTitle}
        formContent={formContent}
        setFormContent={setFormContent}
        formDate={formDate}
        setFormDate={setFormDate}
        formPartnerName={formPartnerName}
        setFormPartnerName={setFormPartnerName}
        formPartnerUrl={formPartnerUrl}
        setFormPartnerUrl={setFormPartnerUrl}
        onSubmit={onSubmit}
      />
    </Modal>
  );
}
