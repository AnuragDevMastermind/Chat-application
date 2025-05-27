import { Monitor, Moon, Sun } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../shadcn/DropdownMenu.tsx";
import { useTheme } from "../../hooks/useTheme.tsx";

export function ThemeSelector() {
  const { theme,setTheme } = useTheme()
  const iconMap ={
    light: <Sun size="20" className="text-primary"/>,
    dark: <Moon size="20" className="text-primary"/>,
    system: <Monitor size="20" className="text-primary"/>,
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {iconMap[theme]}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={()=>setTheme("light")}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={()=>setTheme("dark")}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={()=>setTheme("system")}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}