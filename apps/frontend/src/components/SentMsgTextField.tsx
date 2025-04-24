import { UserResponse } from "@repo/datamodel/user";
import ic_msg_send from "../assets/icons/ic_msg_send.svg";
import ic_paper_clip from "../assets/icons/ic_paper_clip.svg";
import { useSocketIO } from "../context/SocketIOContext";
import { useAppSelector } from "../hooks/useRedux";
import { useForm, SubmitHandler } from "react-hook-form";
import { MessageRequest } from "@repo/datamodel/message";

interface FormValues {
  message: string;
}

const SentMsgTextField = () => {
  const user = useAppSelector((state) => state.loginSlice).user;
  const { sendMessage } = useSocketIO();
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const { friend, conversationId } = useAppSelector((state) => state.activeChatSlice);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (user && friend) {
      const message: MessageRequest = {
        msg: data.message,
        conversationId: conversationId,
        timestamp: new Date(),
        senderId: user._id,
        receiverId: friend._id,
      };
      if (data.message.trim() !== "") {
        sendMessage(message);
        reset();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex">
      <img src={ic_paper_clip} alt="" />
      <div className="w-full h-12 ml-5 relative">
        <input
          type="text"
          className="absolute w-full h-full pl-6 pr-[48px] bg-white border-2 border-gray-200 text-gray-400 rounded-xl outline-none"
          placeholder="Type a Message"
          autoComplete="off"
          {...register("message", { required: true })}
        />
        <button type="submit" className="absolute right-5 top-3">
          <img src={ic_msg_send} alt="" />
        </button>
      </div>
    </form>
  );
};

export default SentMsgTextField;
