import classes from "@/styles/artists.module.css";
import artists from "@/assets/images/landing/featured.png";
import { useNavigate } from "react-router-dom";

function ArtistsRegister() {
  const navigate = useNavigate();

  const handleArtistRegister = () => {
    navigate("/signup", { state: { role: "artists" } });
  };
  return (
    <section id="artist" className={`${classes["artist"]} flex-center`}>
      <div className={classes["row"]}>
        <div>
          <h2>Are you an artist?</h2>
          <p>
            Join our community of musicians and reach millions of listeners
            worldwide.
          </p>
          <ul>
            <li>Get discovered by new fans</li>
            <li>Showcase your creation</li>
            <li>Get analytics of how well a song perform</li>
          </ul>
          <div
            className={classes["btn-register"]}
            onClick={handleArtistRegister}>
            <div className={classes["btn"]}>Register as an artist</div>
          </div>
        </div>
        <div className={classes["artists-img"]}>
          <img src={artists} alt="Artist Image" />
        </div>
      </div>
    </section>
  );
}

export default ArtistsRegister;
