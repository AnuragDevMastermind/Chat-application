import { createSlice } from "@reduxjs/toolkit";
import { UserResponse } from "@repo/datamodel/user";

export interface ActiveChatState {
  friend: UserResponse | null;
  conversationId: string;
}

export const initialState: ActiveChatState = {
  friend: null,
  conversationId: "",
};

export const activeChatSlice = createSlice({
  name: "sideBarStatus",
  initialState,
  reducers: {
    updateChat: (state, action) => {
      state.friend = action.payload.friend;
      state.conversationId = action.payload.conversationId;
    },
  },
});

export const { updateChat } = activeChatSlice.actions;

export default activeChatSlice.reducer;
