import { useState, useEffect } from "react";
import MessageService from "../services/message.service";
import { MessageResponse } from "@repo/datamodel/message";
import { useAppSelector } from "./useRedux";

const useMessages = () => {
  const { friend, conversationId } = useAppSelector(
    (state) => state.activeChatSlice
  );
  const { user } = useAppSelector((state) => state.loginSlice);
  const [messages, setMessages] = useState<MessageResponse[]>([]);
  const [page, setPage] = useState(1);
  const size = 20;

  const increasePage = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    if (page !== 1 && messages.length === 0) return;
    if (conversationId) {
      MessageService.getMessages(conversationId, page, size)
        .then((response: any) => {
          setMessages(response.data);
        })
        .catch((e: Error) => {});
    } else if (user && friend) {
      MessageService.getMessagesUsingIds(user._id, friend._id, page, size)
        .then((response: any) => {
          setMessages(response.data);
        })
        .catch((e: Error) => {});
    }
    console.log("userId", user?._id, "friendId", friend?._id);
  }, [friend, conversationId, page]);

  useEffect(() => {
    if (page != 0) setPage(1);
    console.log("set page");
  }, [friend]);

  return { messages, page, increasePage };
};

export default useMessages;
