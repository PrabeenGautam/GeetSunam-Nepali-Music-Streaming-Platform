import { FiMic, FiSearch } from "react-icons/fi";
import { useNavigate, createSearchParams } from "react-router-dom";

function SearchBar() {
  const navigate = useNavigate();

  const onSubmitValue = (e) => {
    e.preventDefault();
    const query = e.target[0].value;

    const options = {
      pathname: "/results",
      search: `?${createSearchParams({ query })}`,
    };

    if (query) {
      navigate(options, { replace: true });
      e.target.reset();
    }
  };

  return (
    <div>
      <form className="search-bar" onSubmit={onSubmitValue}>
        <FiSearch className="icon-search" />
        <input
          type="text"
          className="text-input"
          placeholder="Search artists, songs,..."
          name="query"
        />
        <input type="submit" hidden />
        <div style={{ borderLeft: "2px solid black", paddingRight: 5 }}></div>
        <FiMic className="icon-mic" />
      </form>
    </div>
  );
}

export default SearchBar;
