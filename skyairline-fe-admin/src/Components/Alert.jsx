import CloseIcon from "@mui/icons-material/Close";
import { Alert } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import * as React from "react";

export default function AlertComponent({ open, handleClose, message, type }) {
  const action = (
    <IconButton size="small" aria-label="close" onClick={handleClose}>
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      action={action}
    >
      <Alert
        onClose={handleClose}
        severity={type}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
