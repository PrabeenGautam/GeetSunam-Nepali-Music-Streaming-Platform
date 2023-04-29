import { useEffect, useRef, useState } from "react";
import { FaBackward, FaForward, FaPause, FaPlay } from "react-icons/fa";

import classes from "@/styles/landing.module.css";
import btn1 from "@/assets/images/landing/download.png";
import { getRandomSongs } from "@/services/musicApi/getSongs.api";

function Hero() {
  const [data, setData] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const audioRef = useRef();
  const progressRef = useRef();
  const progressContainerRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getRandomSongs();
      setData(response.data);
      audioRef.current.volume = 0.5;
    };

    fetchData();
  }, []);

  const playHandler = () => {
    if (isPlaying) {
      setIsPlaying(false);
      audioRef.current.pause();
      return;
    }

    setIsPlaying(true);
    audioRef.current.play();
  };

  const updateProgress = () => {
    const { duration, currentTime } = audioRef.current;
    const progressPercent = (currentTime / duration) * 100;
    progressRef.current.style.width = `${progressPercent}%`;
    setCurrentTime(currentTime);
  };

  function setProgress(e) {
    const width = progressContainerRef.current.clientWidth;
    const clickX = e.nativeEvent.offsetX;
    const duration = audioRef.current.duration;
    const calculatedTime = (clickX / width) * duration;

    setCurrentTime(calculatedTime);
    audioRef.current.currentTime = calculatedTime;
  }

  function getDuration(secs) {
    // 132.13456
    const minutes = String(Math.floor(secs / 60));
    const seconds = String(Math.floor(secs % 60));
    return `${minutes.padStart(2, 0)}:${seconds.padStart(2, 0)}`;
  }

  return (
    <main>
      <section className={classes["hero"]}>
        <div className={classes["container"]}>
          <div className={classes["hero-content"]}>
            <h2 className={classes["hero-title"]}>
              Music, <br />
              always on
            </h2>

            <p className={classes["hero-text"]}>
              Choose your best music with a huge library and start listening,
              anywhere and anytime 100% free
            </p>

            <div className={classes["hero-wrapper"]}>
              <button className={classes["button"]}>
                <img src={btn1} alt="download" />
              </button>
            </div>
          </div>
        </div>

        <div className={classes["music-player"]}>
          <div className={classes["container"]}>
            <div className={classes["ms-player-content"]}>
              <div className={classes["ms-album"]}>
                <div className={classes["ms-thumb"]}>
                  <img src={data?.artists?.profileImage} />
                </div>

                <div className={classes["ms-th-info"]}>
                  <h4>{data?.title}</h4>
                  <span>Song by {data?.artists?.fullname}</span>
                </div>
              </div>

              <div className={classes["ms-player"]}>
                <div className={classes["jp-controls"]}>
                  <button
                    className={`${classes["jp-previous"]} ${classes["button"]}`}>
                    <FaBackward />
                  </button>
                  <button
                    className={`${classes["jp-play"]} ${classes["button"]}`}
                    onClick={playHandler}>
                    {isPlaying ? <FaPause /> : <FaPlay />}
                  </button>
                  <button
                    className={`${classes["jp-next"]} ${classes["button"]}`}>
                    <FaForward />
                  </button>
                </div>

                <div className={classes["title-bar"]}>
                  <div className={classes["ms-top"]}>
                    <div className={classes["jp-time-holder"]}>
                      <div className={classes["jp-current-time"]}>
                        {getDuration(currentTime)}
                      </div>
                      <div className={classes["jp-duration"]}>
                        {data?.duration}
                      </div>
                    </div>
                  </div>

                  <div className={classes["jp-progress"]}>
                    <div
                      className={classes["progress-container"]}
                      id="progress-container"
                      ref={progressContainerRef}
                      onClick={setProgress}>
                      <div
                        className={classes["progress"]}
                        id="progress"
                        ref={progressRef}></div>
                    </div>
                  </div>
                </div>

                <audio
                  src={data?.source}
                  id="audio"
                  ref={audioRef}
                  onTimeUpdate={(e) => {
                    updateProgress(e);
                  }}></audio>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Hero;
