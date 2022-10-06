import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useCurrentSong = () => {
  const [currentSong, setCurrentSong] = useState();
  const currentTrack = useSelector((state) => state.currentTrack);
  const playlist = useSelector((state) => state.playlist);

  useEffect(() => {
    setCurrentSong(playlist[currentTrack]);
  }, [currentTrack, playlist]);

  return currentSong;
};

export default useCurrentSong;
