import ic_search from "../assets/icons/ic_search.svg";
function SearchBar() {
  return (
    <div className="w-[calc(100%-48px)] h-12 bg-[#FFEBD9] rounded-xl flex items-center">
      <img className="ml-4 mr-2 w-6" src={ic_search} alt="" />
      <p className="text-sm font-serif text-[#E28B5A]"> Search Messages</p>
    </div>
  );
}

export default SearchBar;
