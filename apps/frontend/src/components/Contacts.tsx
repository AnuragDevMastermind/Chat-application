import ContactItem from "./ContactItem";
import ic_arrow_back from "../assets/icons/ic_arrow_back.svg";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { setDefaultSidebar } from "../store/slice/sideBarSlice";
import { updateChat } from "../store/slice/activeChatSlice";
import useUser from "../hooks/useUser";
import { UserResponse } from "@repo/datamodel/user";

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
    <div className="absolute w-[413px] h-screen bg-white opacity-100">
      <div className="h-[84px] flex items-center">
        <img
          onClick={handleBackBtn}
          src={ic_arrow_back}
          className="ms-7 me-5"
          alt=""
        />
        <p className="font-serif font-semibold text-xl">New Chat</p>
      </div>
      <div className="h-[1px] bg-slate-300" />
      <div className="h-7"></div>
      {users.map((_user, index) => 
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
