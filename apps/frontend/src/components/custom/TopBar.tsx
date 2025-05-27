
import IcApp from "../../assets/IcApp";
import { ThemeSelector } from "./ThemeSelector";

function TopBar() {
  return (
    <div className="h-14 border-b flex justify-between items-center px-5">
      <div className="flex gap-4">
        <IcApp className="size-7"/>
        <p className="text-primary font-bold">NeoChat</p>
      </div>
      <ThemeSelector/>
    </div>
  )
}

export default TopBar