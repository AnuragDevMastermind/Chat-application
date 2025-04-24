import ic_app_logo from "../assets/icons/ic_app_logo.svg";
import LinearProgressIndicator from "./LinearProgressIndicator";

export function NavBar() {
  return (
    <div className="relative">
      <LinearProgressIndicator />

      <div className="z-10 w-full bg-primary h-16 flex items-center absolute">
        <img className="ms-9 w-8 h-8" src={ic_app_logo} alt="" />
        <p className="ms-2 text-[18px] font-bold text-white">NeoChat</p>
      </div>
    </div>
  );
}
