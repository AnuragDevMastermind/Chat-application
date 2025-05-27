import { LockIcon } from "lucide-react";

const EmptyChatSection = () => {
  return (
    <div className="size-full relative">
      <div className="absolute size-full flex flex-col justify-center">
        <div className="">
          <p className="text-center text-4xl text-primary">
            NeoChat web
          </p>
          <div className="w-full place-content-center flex justify-center">
            <p className="mt-6 mb-6 w-96 text-center text-base text-primary">
              Send and receive messages without keeping your phone online
            </p>
          </div>
        </div>
      </div>
      <div className="size-full flex items-end justify-center">
        <div className="flex gap-2 mb-8 items-center">
          <LockIcon className="size-5"/>
          <p className="">
            Your personal messages are end-to-end encrypted
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmptyChatSection;
