import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import useGSSelector from "@/redux/useGSSelector";

import { SearchBar } from "@/components/Featured";
import { getGenresApi } from "@/services/musicApi/getGenres.api";
import Spinner from "../Loader/Spinner";
import { useQuery } from "react-query";

function SidebarRight() {
  const { userData } = useGSSelector((state) => state.userState);

  const {
    data: genres,
    isLoading,
    isError,
  } = useQuery("genres", getGenresApi, {
    select: (data) => data.data.genres,
  });

  const loader = isLoading || isError;

  return !loader ? (
    <div className="sidebar-right">
      <Link
        to="/settings"
        className="userprofile"
        style={{
          marginTop: 20,
          borderBottom: "1px solid rgba(255,255,255,0.4",
          paddingBottom: 20,
        }}>
        <img src={userData.profileImage} alt="" />
        <div className="userName">{userData.fullname}</div>
      </Link>

      <div className="custom-searchbar">
        <SearchBar />
      </div>
      {genres && (
        <>
          <div className="sidebar-title">Genre</div>
          <div className="grid grid-column-3 gap-sm">
            {genres.map((value) => {
              return (
                <div className="genre" key={value._id}>
                  <Link to={`genre/${value._id}`}>
                    <div className="genre-image">
                      <img src={value.image} alt={"genre"} />
                    </div>
                    <div className="genre-name">{value.name}</div>
                  </Link>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  ) : (
    <Spinner />
  );
}

export default SidebarRight;
