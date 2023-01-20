import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import ArtistsContainer from "@/components/Artists/ArtistsContainer";
import { getArtistsAPI } from "@/services/artistsApi/getArtistsDetails.api";
import artistsImage from "@/assets/images/music-artists.png";
import Loading from "@/components/Loading";

function Artists() {
  const navigate = useNavigate();
  const [artists, setArtists] = useState(null);

  useEffect(() => {
    const fetchArtists = async function () {
      const artists = await getArtistsAPI();
      setArtists(artists.data.artists);
    };

    fetchArtists();
  }, []);

  const onClickArtists = (id) => {
    navigate(`/artists/${id}`);
  };

  return artists ? (
    <div className="playlist-container gradient">
      <section className="playlist">
        <div className="playlist-images custom">
          <img src={artistsImage} alt="" className="custom-img" />
        </div>
        <div className="playlist-details">
          <div>Collection</div>
          <div>Artists</div>
          <div>
            <span>GeetSunam</span>
            <span style={{ fontWeight: "bold" }}>.</span>
            <span>{artists.length} artists</span>
          </div>
        </div>
      </section>

      <ArtistsContainer artistsData={artists} onClickArtists={onClickArtists} />
    </div>
  ) : (
    <Loading />
  );
}

export default Artists;
