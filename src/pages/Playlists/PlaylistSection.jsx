import { useNavigate } from "react-router-dom";

import PlaylistsCover from "assets/images/playlists-cover.png";
import PlaylistsContainer from "./PlaylistContainer";
import { Btn } from "components/StyledUI";

function PlaylistSection() {
  const navigate = useNavigate();
  const array = new Array(6).fill(0);

  const onClickPlaylists = (playlists) => {
    navigate(`/playlists/${playlists}`);
  };

  return (
    <div className="playlist-container gradient">
      <section className="playlist">
        <div className="playlist-images">
          <img src={PlaylistsCover} alt="playlists" />
        </div>
        <div className="playlist-details">
          <div>Collection</div>
          <div>Playlists</div>
          <div>
            <span>Created By: PrabinGautam</span>
            <span style={{ fontWeight: "bold" }}>.</span>
            <span>6 playlist</span>
          </div>
        </div>
        <Btn style={{ color: "#333", position: "absolute", right: 20 }}>
          Create Playlists
        </Btn>
      </section>

      <PlaylistsContainer data={array} onClickPlaylists={onClickPlaylists} />
    </div>
  );
}

export default PlaylistSection;
