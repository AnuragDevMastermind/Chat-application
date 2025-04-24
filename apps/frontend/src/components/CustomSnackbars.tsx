import { Alert, Snackbar } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../hooks/useRedux";
import { setSnackbarStatus } from "../store/slice/snackbarSlice";
import { SNACKBAR_STATUS } from "../constants/enums";
import { useEffect, useState } from "react";
import useLogin from "../hooks/useLogin";

export const CustomSnackBar = () => {
  const { logout } = useLogin();
  const dispatch = useAppDispatch();
  const snackbarStatus = useAppSelector((state) => state.snackbarStatus);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      dispatch(
        setSnackbarStatus({
          status: SNACKBAR_STATUS.IDLE,
          message: snackbarStatus.message,
        })
      );
    }, 500);
  };

  useEffect(() => {
    if (
      snackbarStatus.status === SNACKBAR_STATUS.SUCCESS ||
      snackbarStatus.status === SNACKBAR_STATUS.ERROR
    ) {
      setOpen(true);
    }
  }, [snackbarStatus.status]);

  useEffect(() => {
    const code = snackbarStatus.message.substring(0, 3);
    if (snackbarStatus.message) setMessage(snackbarStatus.message);
    if (snackbarStatus.message && (code === "401" || code === "403")) {
      logout();
    }
  }, [snackbarStatus.message]);

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert
        onClose={handleClose}
        severity={
          snackbarStatus.status === SNACKBAR_STATUS.SUCCESS
            ? "success"
            : "error"
        }
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
