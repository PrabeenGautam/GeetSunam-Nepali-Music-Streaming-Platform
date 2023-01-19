import { useNavigate } from "react-router-dom";

import { featuredArtists } from "@/components/Featured/featureArtists.data";
import AutoMarquee from "@/components/Slider/AutoMarquee";

function FeaturedArtists({ data }) {
  const artistsData = featuredArtists.find((value) => value.id === data.id);
  const navigate = useNavigate();

  const onClickContainer = (id) => navigate(`/artists/${id}`);

  return (
    <>
      <div className="artists-container">
        <div
          className="artists"
          title={artistsData.name}
          onClick={() => onClickContainer(artistsData.id)}>
          <img
            src={artistsData.profile}
            alt="artists"
            className="thumbnail-new"
            style={{ border: `2px solid white` }}
          />

          <AutoMarquee className={"song-artists"} value={artistsData.name} />
        </div>
      </div>
    </>
  );
}

export default FeaturedArtists;
