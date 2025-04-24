import ic_home_background from "../assets/images/ic_empty_home_background.png";
import ic_lock_white from "../assets/icons/ic_lock_white.svg";
import ic_empty_home from "../assets/icons/ic_empty_home.svg";

const EmptyChatSection = () => {
  return (
    <div className="flex-1 relative">
      <img
        className="w-full h-full object-cover absolute"
        src={ic_home_background}
        alt=""
      />
      <div className="w-full h-full absolute flex flex-col items-center">
        <div className="relative ">
          <div className="w-full absolute mt-80">
            <p className="text-center font-serif text-4xl text-white">
              NeoChat web
            </p>
            <div className="w-full place-content-center flex justify-center">
              <p className="mt-6 mb-6 w-96 text-center text-base font-serif text-white">
                Send and receive messages without keeping your phone online
              </p>
            </div>
          </div>
          
          <div className="h-96 w-[500px] overflow-hidden">
            <img className="h-full w-full object-cover" src={ic_empty_home}  />
          </div>
        </div>
      </div>
      <div className="w-full h-full absolute flex justify-center items-end">
        <div className="mb-12 flex">
          <img className="w-5" src={ic_lock_white} alt="" />
          <p className="ms-2 font-serif text-white">
            Your personal messages are end-to-end encrypted
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmptyChatSection;
