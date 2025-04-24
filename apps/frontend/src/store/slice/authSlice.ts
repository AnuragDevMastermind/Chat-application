import { createSlice } from "@reduxjs/toolkit";
import { UserResponse } from "@repo/datamodel/user";

export interface AuthState {
  user: UserResponse | null;
}

export const initialState: AuthState = {
  user: null,
};

export const loginSlice = createSlice({
  initialState,
  name: "authStatus",
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, logout } = loginSlice.actions;
export default loginSlice.reducer;
