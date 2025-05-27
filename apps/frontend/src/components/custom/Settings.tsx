import { useAppDispatch } from "../../hooks/useRedux";
import { setDefaultSidebar } from "../../store/slice/sideBarSlice";
import useLogin from "../../hooks/useLogin";
import { ArrowLeft } from "lucide-react";
import { ThemeSelector } from "./ThemeSelector";
import IcLogout from "../../assets/IcLogout";
import IcHelp from "../../assets/IcHelp";

const Settings = () => {
  const dispatch = useAppDispatch();
  const { logout } = useLogin();
  const handleBackBtn = () => dispatch(setDefaultSidebar());
  return (
    <div className="absolute w-[413px] h-screen bg-background border-e">
      <div className="h-18 flex items-center border-b">
        <ArrowLeft
          onClick={handleBackBtn}
          className="ms-7 me-5 text-txt-1"
        />
        <p className="font-serif font-semibold text-xl">Setting</p>
      </div>
      <div className="h-7"></div>
      <div className="flex items-center">
        <div className="ms-12"/>
        <ThemeSelector/>
        <p className="ms-3 text-sm font-serif me-20">Theme</p>
      </div>
      <div className="h-7"></div>
      <div className="flex items-center">
        <IcHelp className="ms-12"/>
        <p className="ms-3 text-sm font-serif">Help</p>
      </div>
      <div className="h-7"></div>
      <div onClick={logout} className="flex items-center">
        <IcLogout className="ms-12"/>
        <p className="ms-3 text-sm font-serif">Logout</p>
      </div>
    </div>
  );
};

export default Settings;
