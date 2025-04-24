import { AxiosError, AxiosResponse } from "axios";
import { store } from "../store/store";
import { setSnackbarStatus } from "../store/slice/snackbarSlice";
import { SIGNUP_ENDPOINT } from "@repo/utils/endpoints";

export const handleSuccessPopupMessage = (response: AxiosResponse) => {
  let message = "";

  switch (response.config.url) {
    case SIGNUP_ENDPOINT:
      message = "Please login. User successfully registered.";
      break;
  }

  if (message) {
    store.dispatch(
      setSnackbarStatus({
        status: "success",
        message: message,
      })
    );
  }
};

export const handleErrorPopupMessage = (error: AxiosError) => {
  const errorCode = error.response?.status || "Unknown";
  const errorMessage =
    (error.response?.data as { message: string })?.message ||
    "An error occurred.";
  const fullMessage = `${errorCode}: ${errorMessage}`;
  store.dispatch(
    setSnackbarStatus({
      status: "error",
      message: fullMessage,
    })
  );
};
