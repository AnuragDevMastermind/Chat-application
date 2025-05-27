import IcSearch from "../../assets/IcSearch";
import { toast } from "../../hooks/useToast";
function SearchBar() {
  return (
    <div className="w-full flex justify-center">
      <div 
        className="w-[calc(100%-48px)] h-12 bg-foreground-1 rounded-xl flex items-center my-7"
        onClick={()=>toast({title:"Feature not available"})}
      >
        <IcSearch className="ml-4 mr-2 w-6"/>
        <p className="text-sm font-medium text-txt-2"> Search Messages</p>
      </div>
    </div>
  );
}

export default SearchBar;
