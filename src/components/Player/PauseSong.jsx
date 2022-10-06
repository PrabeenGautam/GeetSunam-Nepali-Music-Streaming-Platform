import { PlayerInterface } from "react-mui-player";

const PauseSong = ({ children }) => {
  const pauseSong = () => {
    PlayerInterface.pause();
  };
  return <div onClick={() => pauseSong()}>{children}</div>;
};

export default PauseSong;
