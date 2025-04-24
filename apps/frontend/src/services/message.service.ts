import http from "../Utils/http-common";
import {
   MESSAGES_ENDPOINT,
  MESSAGES_USING_IDS_ENDPOINT,
} from "@repo/utils/endpoints";
import { MessageResponse } from "@repo/datamodel/message";

class MessageService {
  getMessages(conversationId: string, page: number, size: number) {
    return http.post<MessageResponse[]>(
      `${MESSAGES_ENDPOINT}/${conversationId}?page=${page}&size=${size}`,
      {
        withCredentials: true,
      }
    );
  }
  getMessagesUsingIds(
    userId: String,
    friendId: String,
    page: number,
    size: number
  ) {
    return http.post<MessageResponse[]>(
        `${MESSAGES_USING_IDS_ENDPOINT}?userId=${userId}&friendId=${friendId}&page=${page}&size=${size}`,
      {
        withCredentials: true,
      }
    );
  }
}

export default new MessageService();
