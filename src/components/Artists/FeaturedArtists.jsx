import { useNavigate } from "react-router-dom";

import { featuredArtists } from "@/components/Featured/featureArtists.data";
import AutoMarquee from "@/components/Slider/AutoMarquee";

function FeaturedArtists({ data: artistsData }) {
  const navigate = useNavigate();
  const onClickContainer = (id) => navigate(`/artists/${id}`);

  return (
    <>
      <div className="artists-container">
        <div
          className="artists"
          title={artistsData.name}
          onClick={() => onClickContainer(artistsData._id)}>
          <img
            src={artistsData.profileImage}
            alt="artists"
            className="thumbnail-new"
            style={{ border: `2px solid white` }}
          />

          <AutoMarquee
            className={"song-artists"}
            value={artistsData.fullname}
          />
        </div>
      </div>
    </>
  );
}

export default FeaturedArtists;
