import { useState, useEffect } from "react";
import ConversationServices from "../services/conversation.services";
import { ConversationResponse } from "@repo/datamodel/conversation";
import { MessageResponse } from "@repo/datamodel/message";
import { useSocketIO } from "../context/SocketIOContext";
import { useAppSelector } from "./useRedux";
import { SortedMap } from "../Utils/SortedMap";

const useConversation = () => {
  const [conversations, setConversations] = useState<SortedMap>(
    new SortedMap()
  );
  const { socket } = useSocketIO();
  const friend = useAppSelector((state) => state.activeChatSlice.friend);
  const [messageResponse, setMessageResponse] =
    useState<MessageResponse | null>(null);

  useEffect(() => {
    if (friend && messageResponse) {
      setConversations((prevConversations) => {
        prevConversations.set(messageResponse.conversationId.toString(), {
          _id: messageResponse.conversationId.toString(),
          lastMessage: messageResponse.msg,
          lastMessageTime: new Date(messageResponse.timestamp)
            .getTime()
            .toString(),
          friend: friend,
        });
        return prevConversations;
      });
      setMessageResponse(null);
    }
  }, [friend, messageResponse]);

  useEffect(() => {
    ConversationServices.getAllConversation()
      .then((response: any) => {
        const conversationsMap = new SortedMap();
        response.data.forEach((conv: ConversationResponse) => {
          conversationsMap.set(conv._id, conv);
        });
        setConversations(conversationsMap);
      })
      .catch((e: Error) => {
        console.error(e);
      });
  }, []);

  useEffect(() => {
    socket?.on("receive-message", setMessageResponse);
    return () => {
      socket?.off("receive-message", setMessageResponse);
    };
  }, [socket]);

  return { conversations };
};

export default useConversation;
