import ActionCreators from "@/react-mui-player/redux/actionCreators";
import store from "@/react-mui-player/redux/store";
import { getPlayerState } from "./../services/playerState/playerState";
import { possibleMediaState } from "./../components/Player/possibleMediaState.types";

export const fetchState = async () => {
  const response = await getPlayerState();

  if (response.data) {
    store.dispatch(ActionCreators.setPlayerState(response.data.state));
    storePlayerState(response.data.state);
  }
};

export function storePlayerState(state) {
  if (state.mediaState === possibleMediaState.STOPPED)
    state.mediaState = possibleMediaState.PAUSED;

  const stateStringify = JSON.stringify(state);
  if (state.trackID) localStorage.setItem("playerState", stateStringify);
}

export async function getPlayerLocalState() {
  const state = JSON.parse(localStorage.getItem("playerState"));

  state ? store.dispatch(ActionCreators.setPlayerState(state)) : fetchState();
}
