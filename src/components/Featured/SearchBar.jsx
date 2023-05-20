import useDebounce from "@/hooks/useDebounce";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiMic, FiSearch } from "react-icons/fi";
import { useNavigate, createSearchParams } from "react-router-dom";

function SearchBar() {
  const navigate = useNavigate();
  const { t } = useTranslation("translation", { keyPrefix: "placeholder" });

  const [query, setQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query) {
        const options = {
          pathname: "/results",
          search: `?${createSearchParams({ query })}`,
        };

        navigate(options, { replace: true });
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    // <form className="search-bar" onSubmit={onSubmitValue}>
    <form className="search-bar">
      <FiSearch className="icon-search" />
      <input
        type="text"
        className="text-input"
        placeholder={t("searchSongArtists")}
        name="query"
        onChange={(e) => setQuery(e.target.value)}
      />
      <input type="submit" hidden />
      {/* <div style={{ borderLeft: "2px solid black", paddingRight: 5 }}></div>
        <FiMic className="icon-mic" /> */}
    </form>
  );
}

export default SearchBar;
