import { createSlice } from "@reduxjs/toolkit";
import { SIDEBAR_STATUS } from "../../constants/enums";

export const sideBarSlice = createSlice({
  name: "sideBarStatus",
  initialState: SIDEBAR_STATUS.DEFAULT,
  reducers: {
    setDefaultSidebar: () => SIDEBAR_STATUS.DEFAULT,
    setContactSidebar: () => SIDEBAR_STATUS.CONTACTS,
    setSettingSidebar: () => SIDEBAR_STATUS.SETTINGS,
  },
});

export const { setDefaultSidebar, setContactSidebar, setSettingSidebar } =
  sideBarSlice.actions;

export default sideBarSlice.reducer;
