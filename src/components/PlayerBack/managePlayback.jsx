import { useDispatch, useSelector } from "react-redux";
import React from "react";

import ActionCreators from "@/react-mui-player/redux/actionCreators";
import { possibleMediaState } from "@/components/Player/possibleMediaState.types";
import PauseSong from "@/components/Player/PauseSong";
import { Btn } from "@/components/StyledUI";
import PlaySong from "@/components/Player/PlaySong";
import { useTranslation } from "react-i18next";

function ManagePlayback({ song }) {
  const dispatch = useDispatch();
  const { t } = useTranslation("translation", { keyPrefix: "common" });

  const currentSong = useSelector((state) => state);
  const onPlay = () => dispatch(ActionCreators.play());

  return (
    <React.Fragment>
      {currentSong.trackID === song._id ? (
        <React.Fragment>
          {currentSong.mediaState === possibleMediaState.PLAYING && (
            <PauseSong>
              <Btn className="btn-pause">{t("pause")}</Btn>
            </PauseSong>
          )}

          {currentSong.mediaState === possibleMediaState.PAUSED && (
            <Btn className="btn-play" onClick={onPlay}>
              {t("resume")}
            </Btn>
          )}
        </React.Fragment>
      ) : (
        <PlaySong trackDetails={song.trackDetails}>
          <Btn className="btn-play">{t("play")}</Btn>
        </PlaySong>
      )}
    </React.Fragment>
  );
}

export default ManagePlayback;
