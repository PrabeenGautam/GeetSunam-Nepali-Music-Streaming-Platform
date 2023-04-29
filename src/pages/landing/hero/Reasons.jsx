import classes from "@/styles/reasons.module.css";
import { FaBolt, FaGratipay, FaPlayCircle } from "react-icons/fa";
import { MdFeaturedPlayList } from "react-icons/md";

function Reasons() {
  return (
    <>
      <section id={classes["reasons"]} className="flex-center">
        <div>Why GeetSunam?</div>
        <main>
          <div className={classes["circleMainContainer"]}>
            <div className={classes["circleSvg"]}>
              <FaBolt className={classes["icons"]} />
            </div>
            <h3>Wide Range of Music</h3>
            <p>
              Choose your best music with a huge <br />
              library and start listening
            </p>
          </div>

          <div className={classes["circleMainContainer"]}>
            <div className={classes["circleSvg"]}>
              <FaPlayCircle className={classes["icons"]} />
            </div>
            <h3>Play your favorites </h3>
            <p>
              Listen to the songs you love , and <br /> discover new music
            </p>
          </div>

          <div className={classes["circleMainContainer"]}>
            <div className={classes["circleSvg"]}>
              <MdFeaturedPlayList className={classes["icons"]} />
            </div>
            <h3>Playlist made easy</h3>
            <p>
              We'll help you make playlist. Or <br /> enjoy existing playlists.
            </p>
          </div>
          <div className={classes["circleMainContainer"]}>
            <div className={classes["circleSvg"]}>
              <FaGratipay className={classes["icons"]} />
            </div>
            <h3>Make it yours </h3>
            <p>
              Tell us what you like, and we'll <br /> recommend music for you
            </p>
          </div>
        </main>
      </section>

      <section id={classes["itsFree"]} className="flex-center">
        <div>
          <span>It's free.</span> <br />
          No credit card required.
        </div>
      </section>
    </>
  );
}

export default Reasons;
