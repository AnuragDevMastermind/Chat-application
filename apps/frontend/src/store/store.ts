import { combineReducers, Action } from "redux";
import loadingIndicatorSlice from "./slice/loadingIndicatorSilce";
import snackbarStatusSlice from "./slice/snackbarSlice";
import loginSlice from "./slice/authSlice";
import sideBarSlice from "./slice/sideBarSlice";
import activeChatSlice from "./slice/activeChatSlice";
import { configureStore } from "@reduxjs/toolkit";

const appReducer = combineReducers({
  loadingStatus: loadingIndicatorSlice,
  snackbarStatus: snackbarStatusSlice,
  loginSlice: loginSlice,
  sideBarStatus: sideBarSlice,
  activeChatSlice: activeChatSlice,
});

const appReducerTyped = appReducer as (
  state: RootState | undefined,
  action: Action<any>
) => RootState;

export const rootReducer = (
  state: RootState | undefined,
  action: Action<any>
) => {
  if (action.type === "reset") {
    state = undefined;
  }
  return appReducerTyped(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof appReducer>;
export type AppDispatch = typeof store.dispatch;
