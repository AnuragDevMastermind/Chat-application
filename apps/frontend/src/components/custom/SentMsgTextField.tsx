import { useSocketIO } from "../../context/SocketIOContext";
import { useAppSelector } from "../../hooks/useRedux";
import { useForm, SubmitHandler } from "react-hook-form";
import { MessageRequest } from "@repo/datamodel/message";
import IcSend from "../../assets/IcSend";
import IcClip from "../../assets/IcClip";

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
    <form onSubmit={handleSubmit(onSubmit)} className="flex items-center">
      <IcClip/>
      <div className="w-full h-12 ml-5 relative">
        <input
          type="text"
          className="absolute w-full h-full pl-6 pr-[48px] bg-background border-2 border-border-1 text-txt-2 rounded-xl outline-none"
          placeholder="Type a Message"
          autoComplete="off"
          {...register("message", { required: true })}
        />
        <button type="submit" className="absolute right-5 top-3">
          <IcSend/>
        </button>
      </div>
    </form>
  );
};

export default SentMsgTextField;
