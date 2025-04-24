import { Socket } from "socket.io";
import cookie from "cookie";
import { createMessage } from "../db/repositories/message.repository";
import { getUserFromToken } from "../helpers/auth.helper";
import { MessageRequest } from "@repo/datamodel/message";
import { ServerSocket } from "../services/socket.services";
import {
  createConversation,
  getConversation,
} from "../db/repositories/conversation.repository";

export const activeUserMap = new Map<string, string>();

export const handleConnection = (socket: Socket) => {
  registerUserAndNotify(socket);
  socket.on("disconnect", () => handleDisconnect(socket));
  socket.on("join-online-room", (room: string) =>
    handleJoinOnlineRoom(room, socket)
  );
  socket.on("send-message", (messageRequest: MessageRequest) =>
    handleMessage(messageRequest, socket)
  );
};

const handleDisconnect = (socket: Socket) => {
  const user = getUserFromSocket(socket);
  if (user) {
    activeUserMap.delete(user._id);
    socket.to(user._id).emit("online-status", false);
  }
};

const handleJoinOnlineRoom = (room: string, socket: Socket) => {
  console.log(room);
  socket.emit("online-status", activeUserMap.has(room));
  socket.rooms.forEach((_room) => _room != socket.id && socket.leave(_room));
  socket.join(room);
};

const handleMessage = async (
  messageRequest: MessageRequest,
  socket: Socket
) => {
  const { receiverId, ...message } = messageRequest;

  console.log(messageRequest);

  // Check if conversationId is present
  if (!message.conversationId) {
    // Query MongoDB to check if a conversation exists between sender and receiver
    const conversation = await getConversation(
      message.senderId,
      receiverId as String
    );
    if (conversation) {
      message.conversationId = conversation._id;
    } else {
      const newConversation = await createConversation({
        userIds: [message.senderId, receiverId],
        lastMessage: message.msg,
        lastMessageTime: Date.now(),
      });
      message.conversationId = `${newConversation._id}`;
    }
  }

  const senderSocket = getSocketFromUserId(message.senderId.toString());
  const receiverSocket = getSocketFromUserId(receiverId);

  const sender = getUserFromSocket(socket)
  message.senderId = sender._id
  const _message = await createMessage(message);

  senderSocket?.emit("receive-message", _message);
  receiverSocket?.emit("receive-message", _message);
};

const registerUserAndNotify = (socket: Socket) => {
  const user = getUserFromSocket(socket);
  if (user) {
    activeUserMap.set(user._id, socket.id);
    socket.to(user._id).emit("online-status", true);
  }
};

const getUserFromSocket = (socket: Socket) => {
  try {
    const cookies = cookie.parse(socket.handshake.headers.cookie || "");
    const authToken = cookies.Authorization;
    if (authToken) {
      return getUserFromToken(authToken.split(" ")[1]);
    }
  } catch (error) {
    console.error("Error extracting user from socket:", error);
  }
  return null;
};

const getSocketFromUserId = (receiverId: string): Socket | undefined => {
  const receiverSocketId = activeUserMap.get(receiverId);
  return ServerSocket.instance.io.sockets.sockets.get(receiverSocketId);
};
