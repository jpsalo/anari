import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getSkater,
  PlayersActionType,
  PlayersContext,
  PlayersDispatch,
  PlayersDispatchContext,
} from "../data/PlayersContext";
import { ROUTES } from "../utils/routes";

function Player() {
  const playersContext = useContext(PlayersContext);
  const dispatch = useContext(PlayersDispatchContext) as PlayersDispatch;
  const navigate = useNavigate();
  const location = useParams();
  const playerId = Number(location?.playerId);
  const playerDetails = playersContext?.skaterDetails?.find(
    (skater) => skater.playerId === playerId,
  );

  useEffect(() => {
    const loadSkaterDetails = async () => {
      try {
        const skater = await getSkater(playerId);
        dispatch({
          type: PlayersActionType.SET_SKATER_DETAILS,
          skaterDetail: skater,
        });
      } catch (error) {
        navigate(ROUTES.ERROR.path);
      }
    };

    if (!playerDetails) loadSkaterDetails();
  }, [dispatch, navigate, playerDetails, playerId]);

  return (
    <>
      <div>{playerDetails?.name}</div>
      <div>{playerDetails?.playerId}</div>
    </>
  );
}

export default Player;
