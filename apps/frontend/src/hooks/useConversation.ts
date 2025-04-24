  import { useState, useEffect } from "react";
  import ConversationServices from "../services/conversation.services";
  import { ConversationResponse } from "@repo/datamodel/conversation";
  import { MessageResponse } from "@repo/datamodel/message";
  import { useSocketIO } from "../context/SocketIOContext";

  const useConversation = () => {
    const [conversations, setConversations] = useState<
      Array<ConversationResponse>
    >([]);
    const { socket } = useSocketIO();

    const updateConversation = (messageResponse: MessageResponse) => {
      setConversations((prevConversations) => {
        const updatedConversations = prevConversations.map((conversation) => {
          if (conversation._id === messageResponse.conversationId) {
            return {
              ...conversation,
              lastMessage: messageResponse.msg,
              lastMessageTime: new Date(messageResponse.timestamp).getTime().toString(),
            };
          }
          return conversation;
        });
        updatedConversations.sort(
          (a, b) => Number(b.lastMessageTime) - Number(a.lastMessageTime)

        );
        return updatedConversations;
      });
    };

    useEffect(() => {
      const fetchConversation = () => {
        ConversationServices.getAllConversation()
          .then((response: any) => {
            const sortedConversations = response.data.sort(
              (a: ConversationResponse, b: ConversationResponse) =>
                Number(b.lastMessageTime) - Number(a.lastMessageTime)
            );
            setConversations(sortedConversations);
          })
          .catch((e: Error) => {});
      };
      fetchConversation();
    }, []);

    useEffect(() => {
      socket?.on("receive-message", updateConversation);
      return () => {
        socket?.off("receive-message", updateConversation);
      };
    }, [socket]);

    return { updateConversation, conversations };
  };

  export default useConversation;
