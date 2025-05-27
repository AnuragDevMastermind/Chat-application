import ContactItem from "./ContactItem";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { setDefaultSidebar } from "../../store/slice/sideBarSlice";
import { updateChat } from "../../store/slice/activeChatSlice";
import useUser from "../../hooks/useUser";
import { UserResponse } from "@repo/datamodel/user";
import { ArrowLeft } from "lucide-react";

const Contacts = () => {
  const dispatch = useAppDispatch();
  const { users } = useUser();
  const handleBackBtn = () => dispatch(setDefaultSidebar());
  const user = useAppSelector((state) => state.loginSlice).user;
  const handleContactItemClick = (friend: UserResponse) => {
    dispatch(
      updateChat({
        friend: friend,
        conversationId: "",
      })
    );
    dispatch(setDefaultSidebar());
  };

  return (
    <div className="absolute w-[413px] h-screen bg-background border-e opacity-100">
      <div className="h-18 flex items-center border-b">
        <ArrowLeft
          onClick={handleBackBtn}
          className="ms-7 me-5 text-txt-1"
        />
        <p className="font-serif font-semibold text-xl">New Chat</p>
      </div>
      
      <div className="h-7"></div>
      {users.map((_user) => 
        _user._id !== user?._id && (
          <ContactItem
            key={_user._id}
            user={_user}
            onClick={() => handleContactItemClick(_user)}
          />
        )
      )}
    </div>
  );
};

export default Contacts;
