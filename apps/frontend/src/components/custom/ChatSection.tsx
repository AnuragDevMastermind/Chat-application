import SelfMsgItem from "./SelfMsgItem";
import OtherMsgItem from "./OtherMsgItem";
import ic_person_1_color from "../../assets/ic_person_1_color.png";
import SentMsgTextField from "./SentMsgTextField";
import { useSocketIO } from "../../context/SocketIOContext";
import { UserResponse } from "@repo/datamodel/user";
import { useEffect, useRef, useState } from "react";
import { MessageResponse } from "@repo/datamodel/message";
import useMessages from "../../hooks/useMessages";
import { useLayoutEffect } from "react";

interface ChatSectionProp {
  friend: UserResponse;
}

const ChatSection: React.FC<ChatSectionProp> = ({ friend }) => {
  const { socket, isOnline } = useSocketIO();
  const [messages, setMessages] = useState<Array<MessageResponse>>([]);
  const [newMessageFromSocket, setNewMessageFromSocket] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { messages: fetchedMessages, increasePage } = useMessages();
  const scrollPositionRef = useRef(0); // Ref to store scroll position

    useEffect(() => {
    setMessages([]);
    // Fetch initial messages for the new friend
    // This assumes your useMessages hook fetches messages based on friend._id
  }, [friend]);

  // Append new messages from useMessages hook to the beginning of messages state
  useEffect(() => {
    if (fetchedMessages.length > 0) {
      setMessages((prevMessages) => [
        ...fetchedMessages.reverse(),
        ...prevMessages,
      ]);
    }
  }, [fetchedMessages]);

  // Handle incoming messages from socket
  useEffect(() => {
    const handleMessageReceive = (messageResponse: MessageResponse) => {
      setMessages((prevMessages) => [...prevMessages, messageResponse]);
      setNewMessageFromSocket(true);
    };

    socket.on("receive-message", handleMessageReceive);

    return () => {
      socket.off("receive-message", handleMessageReceive);
    };
  }, [socket]);

  // Scroll to bottom when new message from socket is received
  useEffect(() => {
    const scrollToBottom = () => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop =
          chatContainerRef.current.scrollHeight;
      }
    };

    if (newMessageFromSocket) {
      scrollToBottom();
      setNewMessageFromSocket(false);
    }
  }, [newMessageFromSocket, messages, chatContainerRef]);

  // Store scroll position before messages state update
  useEffect(() => {
    if (chatContainerRef.current) {
      scrollPositionRef.current =
        chatContainerRef.current.scrollHeight -
        chatContainerRef.current.scrollTop;
    }
  }, [fetchedMessages]);

  // Restore scroll position after messages state update
  useLayoutEffect(() => {
    if (chatContainerRef.current && fetchedMessages.length > 0) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight - scrollPositionRef.current;
    }
  }, [messages]);

  // Scroll event listener to detect reaching top and trigger increasePage
  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop } = chatContainerRef.current;
      if (scrollTop === 0) {
        increasePage();
      }
    }
  };

  useEffect(() => {
    chatContainerRef.current?.addEventListener("scroll", handleScroll);
    return () => {
      chatContainerRef.current?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="size-full flex flex-col">
      <div className="bg-background h-18 w-full border-b flex items-center">
        <div className="ms-5 h-10 flex">
          <img
            className="h-full rounded-lg"
            src={ic_person_1_color}
            alt=""
          />
          <div className="ms-4">
            <p className="font-serif font-semibold text-xl">
              {friend.name}
            </p>
            <div className="flex items-center">
              <div className={`h-2 w-2 rounded-full ${isOnline?"bg-primary":"bg-foreground-2"}`} />
              <p className="ms-1 text-xs font-semibold font-serif text-txt-2">
                {isOnline ? "Online" : "Offline"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-auto px-5" ref={chatContainerRef}>
          {messages.map((message) =>
          message.senderId === friend._id ? (
            <OtherMsgItem key={message._id} message={message} />
          ) : (
            <SelfMsgItem key={message._id} message={message} />
          )
        )}
      </div>
      <div className="mx-5 mb-4">
          <SentMsgTextField/>
        </div>
    </div>
  );
};
export default ChatSection;
