import { Link } from "react-router-dom";

function LoginUser({ userData }) {
  return (
    <Link to="/settings" className="userprofile">
      <img src={userData.profileImage} alt="" />
      <div className="user-name">{userData.fullname}</div>
    </Link>
  );
}

export default LoginUser;
