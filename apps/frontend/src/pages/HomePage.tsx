import SearchBar from "../components/custom/SearchBar";
import InboxItem from "../components/custom/InboxItem";
import useConversation from "../hooks/useConversations";
import Contacts from "../components/custom/Contacts";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { SIDEBAR_STATUS } from "../constants/enums";
import {
  setContactSidebar,
  setSettingSidebar,
} from "../store/slice/sideBarSlice";
import ChatSection from "../components/custom/ChatSection";
import { useSocketIO } from "../context/SocketIOContext";
import { useEffect } from "react";
import EmptyChatSection from "../components/custom/EmptyChatSection";
import Settings from "../components/custom/Settings";
import IcIcon from "../assets/IcApp";
import IcStatus from "../assets/IcStatus";
import IcPlusSquare from "../assets/IcPlusSquare";
import IcSetting from "../assets/IcSetting";
import { ScrollArea } from "../components/shadcn/ScrollArea";

const HomePage = () => {
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
    <div className="size-full flex ">
      <div className="py-7 w-16 bg-foreground-1 flex flex-col justify-between items-center">
        <div className="flex flex-col items-center">
          <IcIcon/>
          <div className="h-8"/>
          <IcStatus />
          <div className="h-4"/>
          <IcPlusSquare onClick={() => dispatch(setContactSidebar())}/>
        </div>
        <IcSetting onClick={() => dispatch(setSettingSidebar())}/>
      </div>
      <div className="w-[349px] flex flex-col border-x">
        <p className="w-full h-18 text-center content-center border-b font-bold text-2xl">Messages</p>
        <SearchBar />
        <div className="w-full flex-1 min-h-0">
          <ScrollArea className="size-full overflow-auto">
            <div className="w-full flex flex-col gap-4 items-center">
              {Array.from(conversations.values()).map((conversation) => (
                <InboxItem
                  key={conversation._id}
                  conversation={conversation}
                  active={conversationId === conversation._id}
                />
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
      {sideBarStatus === SIDEBAR_STATUS.CONTACTS && <Contacts />}
      {sideBarStatus === SIDEBAR_STATUS.SETTINGS && <Settings />}
      <div className="flex-1 bg-[oklch(0.97_0.0013_286.38)] dark:bg-[oklch(0.2_0.0016_197.03)]">
        {friend ? <ChatSection friend={friend} /> : <EmptyChatSection />}
      </div>
    </div>
  );
};

export default HomePage;
