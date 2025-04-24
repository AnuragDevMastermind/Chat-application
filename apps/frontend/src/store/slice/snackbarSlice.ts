import { createSlice } from "@reduxjs/toolkit";
import { SNACKBAR_STATUS } from "../../constants/enums";

export const snackbarStatusSlice = createSlice({
  name: "snackbarStatus",
  initialState: {
    status: SNACKBAR_STATUS.IDLE,
    message: "",
  },
  reducers: {
    setSnackbarStatus: (state, action) => {
      state.status = action.payload.status;
      state.message = action.payload.message;
    },
  },
});

export const { setSnackbarStatus } = snackbarStatusSlice.actions;

export default snackbarStatusSlice.reducer;
