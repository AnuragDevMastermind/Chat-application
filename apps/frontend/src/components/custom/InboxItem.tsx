import { UserResponse } from "@repo/datamodel/user";
import ic_person_1_color from "../../assets/ic_person_1_color.png";
import { ConversationResponse } from "@repo/datamodel/conversation";
import { updateChat } from "../../store/slice/activeChatSlice";
import { useAppDispatch } from "../../hooks/useRedux";

interface InboxItemProps {
  conversation: ConversationResponse;
  active: boolean;
}

const formatDate = (timestamp: string) => {
  const date = new Date(parseInt(timestamp));
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInHours = diffInMs / (1000 * 60 * 60);

  if (diffInHours > 24) {
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear().toString().slice(-2)}`;
  } else {
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  }
};

function InboxItem({ conversation, active }: InboxItemProps) {
  const dispatch = useAppDispatch();
  const handleContactItemClick = (friend: UserResponse) => {
    dispatch(
      updateChat({
        friend: friend,
        conversationId: conversation._id,
      })
    );
  };

  return (
    <div
      onClick={() => handleContactItemClick(conversation.friend)}
      className={`${
        active
          ? 'w-[calc(100%-24px)] rounded-xl px-3 py-3 mt-2 flex bg-foreground-1'
          : 'w-[calc(100%-48px)] mt-6 flex'
      }`}
    >
      <img className="w-12 h-12 rounded-lg" src={ic_person_1_color} alt="" />
      <div className="w-3" />
      <div>
        <p className="text-sm font-serif font-semibold">
          {conversation.friend.name}
        </p>
        <p className="text-xs font-serif font-semibold text-txt-2">
          {conversation.lastMessage}
        </p>
      </div>

      <p className={`flex-1 text-right text-sm font-serif font-semibold ${active?"text-primary":"text-txt-2"}`}>
        {formatDate(conversation.lastMessageTime)}
      </p>
    </div>
  );
}

export default InboxItem;
