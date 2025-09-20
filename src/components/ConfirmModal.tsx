import { Button } from "@polyutils/components";
import Modal from "./Modal";

type Props = {
  open: boolean;
  title: string;
  itemName: string;
  onCancel: () => void;
  onConfirm: () => void;
  busy: boolean;
};

export default function ConfirmModal({
  open,
  title,
  itemName,
  onCancel,
  onConfirm,
  busy,
}: Props) {
  return (
    <Modal
      open={open}
      onClose={onCancel}
      title={title}
      footer={
        <>
          <Button appearance="default" size="medium" shape="square" onClick={onCancel} disabled={busy}>
            Cancel
          </Button>
          <Button appearance="primary" size="medium" shape="square" onClick={onConfirm} disabled={busy}>
            Delete
          </Button>
        </>
      }
    >
      <p>
        Are you sure you want to delete{" "}
        <strong>{itemName || "this item"}</strong>?
      </p>
    </Modal>
  );
}
