import { useParams } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { useQuery, useMutation, useQueryClient } from "react-query";

import ArtistsPlayed from "./ArtistsPlayed";
import { getArtistsSongs } from "@/services/artistsApi/getArtistsDetails.api";
import { trackDetails } from "@/utils/trackDetails.utils";
import Spinner from "../Loader/Spinner";
import { useArtistsData } from "@/hooks/useArtistsData";
import { toggleArtistsFavourite } from "@/services/artistsApi/patchArtistsDetails";
import { PlaylistLoader } from "../Loader/LoaderComponents";
import RecentPlayed from "../SongsList";

function ArtistsDetails() {
  const { id: artistId } = useParams();

  const {
    data: artist,
    isLoading: isLoadingArtists,
    isError: isErrorArtists,
  } = useArtistsData(artistId);

  const { data, isLoading, isError } = useQuery(
    ["songs", artistId],
    () => getArtistsSongs(artistId),
    {
      select: (data) => data.data.songs,
    }
  );

  const artistsSong = data && trackDetails(data);
  const loaderArtists = isLoadingArtists || isErrorArtists;
  const songLoading = isLoading || isError;

  const queryClient = useQueryClient();

  const { mutate, isLoadingFavourite } = useMutation(
    (id) => toggleArtistsFavourite(id),
    {
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ["artists", artistId] });
      },
    }
  );

  const handleArtistFavourite = function (event) {
    event.preventDefault();
    if (isLoadingFavourite) return;
    mutate(artistId);
  };

  return (
    <div className="playlist-container gradient">
      {!loaderArtists ? (
        <section className="playlist">
          <div className="artists-images">
            <img src={artist?.profileImage} alt="thumbnail" />
          </div>
          <div className="playlist-details">
            <div>Artists</div>
            <div>{artist?.fullname}</div>
            <div>
              <span>GeetSunam</span>
              <span style={{ fontWeight: "bold" }}>.</span>
              <span>{artistsSong?.length} songs</span>
            </div>
          </div>
          <div style={{ position: "absolute", right: 20, zIndex: 999 }}>
            <button
              className="custom-btn"
              title="Remove from Favourite"
              onClick={handleArtistFavourite}>
              {artist?.isFavourite ? (
                <FiHeart
                  style={{
                    fill: "var(--highlight)",
                    stroke: "var(--highlight)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
              ) : (
                <FiHeart
                  style={{
                    stroke: "var(--highlight)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
              )}
            </button>
          </div>
        </section>
      ) : (
        <PlaylistLoader />
      )}

      <div className="padding">
        {!songLoading ? (
          artistsSong.length > 0 ? (
            <RecentPlayed
              data={artistsSong}
              terminateQueries="songs"
              terminateWithId={true}
              artistContainer={true}
            />
          ) : (
            <h3>Artists have not uploaded any songs.</h3>
          )
        ) : (
          <div className="mt-80">
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
}

export default ArtistsDetails;
