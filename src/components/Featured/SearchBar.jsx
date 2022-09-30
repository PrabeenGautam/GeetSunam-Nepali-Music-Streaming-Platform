import * as FiIcons from "react-icons/fi";

function SearchBar() {
  return (
    <div className="search-bar">
      <FiIcons.FiSearch className="icon-search" />
      <input
        type="text"
        className="text-input"
        placeholder="Search artists, songs,..."
      />
      <div style={{ borderLeft: "2px solid black", paddingRight: 5 }}></div>
      <FiIcons.FiMic className="icon-mic" />
    </div>
  );
}

export default SearchBar;
