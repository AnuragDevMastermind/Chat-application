import { MessageResponse } from "@repo/datamodel/message";

interface SelfMsgItemProp {
  message: MessageResponse;
}

const SelfMsgItem: React.FC<SelfMsgItemProp> = ({ message }) => {
  return (
    <div className="w-full flex justify-end mt-2 mb-2">
      <p className="px-4 py-2 bg-primary w-fit rounded-xl text-sm font-serif text-white">
        {message.msg}
      </p>
    </div>
  );
};

export default SelfMsgItem;
