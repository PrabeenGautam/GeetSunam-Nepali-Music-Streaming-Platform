import { FaMusic } from "react-icons/fa";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <div className="logo">
      <Link to={"/"} id="home">
        <FaMusic className="logo__music" />
        <div className="logo__text">
          <span className="logo__primary">Geet</span>Sunam
        </div>
      </Link>
    </div>
  );
}

export default Logo;
