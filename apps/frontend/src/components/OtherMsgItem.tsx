import { MessageResponse } from "@repo/datamodel/message";

interface OtherMsgItemProp {
  message: MessageResponse;
}
const OtherMsgItem: React.FC<OtherMsgItemProp> = ({ message }) => {
  return (
    <div className="w-full mt-2 mb-2">
      <p className="px-4 py-2 bg-orange-500 w-fit rounded-xl text-sm font-serif text-white">
        { message.msg }
      </p>
    </div>
  );
};

export default OtherMsgItem;
