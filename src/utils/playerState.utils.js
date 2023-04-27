import ActionCreators from "@/react-mui-player/redux/actionCreators";
import store from "@/react-mui-player/redux/store";
import {
  getPlayerState,
  updatePlayerState,
} from "./../services/playerState/playerState";
import { possibleMediaState } from "./../components/Player/possibleMediaState.types";
import { isUserLogin } from "./storage.utils";

export const fetchState = async () => {
  const hasUserLogin = isUserLogin();
  if (!hasUserLogin) return;

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
  const hasUserLogin = isUserLogin();
  if (!hasUserLogin) return;

  const state = JSON.parse(localStorage.getItem("playerState"));
  state ? store.dispatch(ActionCreators.setPlayerState(state)) : fetchState();
}

export async function updatePlayState(token) {
  const hasUserLogin = isUserLogin();
  if (!hasUserLogin) return;

  const state = localStorage.getItem("playerState");
  return updatePlayerState(state, token);
}
