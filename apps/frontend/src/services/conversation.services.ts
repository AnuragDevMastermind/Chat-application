import http from "../Utils/http-common";
import { ALL_CONVERSATION_ENDPOINT } from "@repo/utils/endpoints";
import { ConversationResponse } from "@repo/datamodel/conversation";

class ConversationServices {
  getAllConversation() {
    return http.post<Array<ConversationResponse>>(ALL_CONVERSATION_ENDPOINT);
  }
}

export default new ConversationServices();
