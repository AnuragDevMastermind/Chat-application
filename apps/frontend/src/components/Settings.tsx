import ic_arrow_back from "../assets/icons/ic_arrow_back.svg";
import ic_theme from "../assets/icons/ic_theme.svg";
import ic_help from "../assets/icons/ic_help.svg";
import ic_logout from "../assets/icons/ic_logout.svg";
import { useAppDispatch } from "../hooks/useRedux";
import { setDefaultSidebar } from "../store/slice/sideBarSlice";
import useLogin from "../hooks/useLogin";

const Settings = () => {
  const dispatch = useAppDispatch();
  const { logout } = useLogin();
  const handleBackBtn = () => dispatch(setDefaultSidebar());
  return (
    <div className="absolute w-[413px] h-screen bg-white opacity-100">
      <div className="h-[84px] flex items-center">
        <img
          onClick={handleBackBtn}
          src={ic_arrow_back}
          className="ms-7 me-5"
          alt=""
        />
        <p className="font-serif font-semibold text-xl">Setting</p>
      </div>
      <div className="h-[1px] bg-slate-300" />
      <div className="h-7"></div>
      <div className="flex items-center">
        <img className="ms-12" src={ic_theme} alt="" />
        <p className="ms-3 text-sm font-serif">Theme</p>
      </div>
      <div className="h-7"></div>
      <div className="flex items-center">
        <img className="ms-12" src={ic_help} alt="" />
        <p className="ms-3 text-sm font-serif">Help</p>
      </div>
      <div className="h-7"></div>
      <div onClick={logout} className="flex items-center">
        <img className="ms-12" src={ic_logout} alt="" />
        <p className="ms-3 text-sm font-serif">Logout</p>
      </div>
    </div>
  );
};

export default Settings;
