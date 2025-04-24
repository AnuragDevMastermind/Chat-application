import ic_app_logo from "../assets/icons/ic_app_logo.svg";
import ic_status from "../assets/icons/ic_status.svg";
import ic_contacts from "../assets/icons/ic_chat_plus.svg";
import ic_setting from "../assets/icons/ic_setting.svg";
import SearchBar from "../components/SearchBar";
import InboxItem from "../components/InboxItem";
import useConversation from "../hooks/useConversations";
import Contacts from "../components/Contacts";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { SIDEBAR_STATUS } from "../constants/enums";
import {
  setContactSidebar,
  setSettingSidebar,
} from "../store/slice/sideBarSlice";
import ChatSection from "../components/ChatSection";
import { useSocketIO } from "../context/SocketIOContext";
import { useEffect } from "react";
import EmptyChatSection from "../components/EmptyChatSection";
import Settings from "../components/Settings";

const Home = () => {
  const { initializeSocketConnection } = useSocketIO();
  const { conversations } = useConversation();
  const sideBarStatus = useAppSelector((state) => state.sideBarStatus);
  const { friend, conversationId } = useAppSelector(
    (state) => state.activeChatSlice
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    initializeSocketConnection();
  }, []);

  return (
    <div className="relative">
      <div className="w-screen h-screen flex absolute ">
        <div className="py-7 min-w-16 bg-[#35312D] flex flex-col justify-between items-center ">
          <div className="flex flex-col items-center">
            <img className="w-10 h-9" src={ic_app_logo} alt="" />
            <div className="h-8"></div>
            <img className="w-7" src={ic_status} alt="" />
            <div className="h-4"></div>
            <img
              onClick={() => dispatch(setContactSidebar())}
              className="w-7"
              src={ic_contacts}
              alt=""
            />
          </div>
          <img
            onClick={() => dispatch(setSettingSidebar())}
            className="w-6"
            src={ic_setting}
            alt=""
          />
        </div>
        <div className="min-w-[349px] flex flex-col items-center">
          <div className="h-6" />
          <p className="w-full text-center font-serif font-semibold text-xl">
            Messages
          </p>
          <div className="w-full h-8 " />
          <div className="w-full h-[1px] bg-slate-300" />
          <div className="w-full h-4 " />
          <SearchBar />
          {Array.from(conversations.values()).map((conversation, index) => (
            <InboxItem
              key={conversation._id}
              conversation={conversation}
              active={conversationId === conversation._id}
            />
          ))}
        </div>
        {sideBarStatus === SIDEBAR_STATUS.CONTACTS && <Contacts />}
        {sideBarStatus === SIDEBAR_STATUS.SETTINGS && <Settings />}
        {friend ? <ChatSection friend={friend} /> : <EmptyChatSection />}
      </div>
    </div>
  );
};

export default Home;
