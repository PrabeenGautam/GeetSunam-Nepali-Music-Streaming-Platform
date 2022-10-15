import ActionCreators from "../actionCreators.js";
import { ActionTypes } from "../types.js";

const skipHelper = (store) => {
  return (next) => (action) => {
    let state = store.getState();
    let currentTrack = state.currentTrack;
    let nextSong = state.playlist[currentTrack + 1];
    let prevSong = state.playlist[currentTrack - 1];

    if (action.type === ActionTypes.SKIP_NEXT)
      if (nextSong) {
        const { ID, favourite } = nextSong;
        store.dispatch(ActionCreators.changeTrack(currentTrack + 1));
        store.dispatch(ActionCreators.getMusicDetails({ ID, favourite }));
      } else {
        store.dispatch(ActionCreators.changeTrack(currentTrack + 1));
      }
    else if (action.type === ActionTypes.SKIP_PREV)
      if (prevSong) {
        const { ID, favourite } = prevSong;
        store.dispatch(ActionCreators.changeTrack(currentTrack - 1));
        store.dispatch(ActionCreators.getMusicDetails({ ID, favourite }));
      } else {
        store.dispatch(ActionCreators.changeTrack(currentTrack - 1));
      }

    return next(action);
  };
};

export default skipHelper;
