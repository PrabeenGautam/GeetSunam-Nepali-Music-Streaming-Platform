import * as FiIcons from "react-icons/fi";

function SearchBar({ className = "search-bar", inputClass = "text-input" }) {
  return (
    <div className={className}>
      <FiIcons.FiSearch className="icon-search" />
      <input
        type="text"
        className={inputClass}
        placeholder="Search artists, songs,..."
      />
      <div style={{ borderLeft: "2px solid black", paddingRight: 5 }}></div>
      <FiIcons.FiMic className="icon-mic" />
    </div>
  );
}

export default SearchBar;
