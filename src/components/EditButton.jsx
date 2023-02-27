import EditLeader from "./EditLeader";
import { useState } from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";

export default function EditButton(props) {
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    props?.onClose();
  };
  return (
    <>
      {props?.item ? (
        <IconButton
          aria-label="edit"
          size="small"
          component="label"
          onClick={() => {
            setShowModal(true);
          }}
        >
          <EditIcon fontSize="small" />
        </IconButton>
      ) : (
        <Button
          color="primary"
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={() => {
            setShowModal(true);
          }}
        >
          新規追加
        </Button>
      )}
      <EditLeader
        showModal={showModal}
        item={props?.item?.row}
        onClose={() => {
          setShowModal(false);
          closeModal();
        }}
      ></EditLeader>
    </>
  );
}
