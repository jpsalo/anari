import { Avatar, CircularProgress } from "@mui/material";
import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getNearestPlayers,
  getSkaterDetails,
  PlayersActionType,
  PlayersContext,
  PlayersDispatch,
  PlayersDispatchContext,
} from "../data/PlayersContext";
import { ROUTES } from "../utils/routes";
import LOGOS from "../data/logos";

function Player() {
  const playersContext = useContext(PlayersContext);
  const dispatch = useContext(PlayersDispatchContext) as PlayersDispatch;
  const navigate = useNavigate();
  const location = useParams();
  const playerId = Number(location?.playerId);
  const playerDetails = playersContext?.skaterDetails?.find(
    (skater) => skater.playerId === playerId,
  );
  const nearestPlayerIds = playerDetails?.nearestPlayersIds;
  const nearestPlayerDetails = nearestPlayerIds?.map((id) =>
    playersContext?.skaterDetails?.find((skater) => skater.playerId === id),
  );

  useEffect(() => {
    const loadSkaterDetails = async () => {
      try {
        const skater = await getSkaterDetails(playerId);
        dispatch({
          type: PlayersActionType.SET_SKATER_DETAILS,
          skaterDetail: skater,
        });
      } catch (error) {
        navigate(ROUTES.ERROR.path);
      }
    };

    const loadNearestPlayers = async () => {
      try {
        const nearestPlayers = await getNearestPlayers(playerId);
        const nearestPlayersIds: number[] = [];
        nearestPlayers.forEach((player) => {
          dispatch({
            type: PlayersActionType.SET_SKATER_DETAILS,
            skaterDetail: player,
          });
          nearestPlayersIds.push(player.playerId);
        });
        dispatch({
          type: PlayersActionType.SET_NEAREST_PLAYERS,
          playerId: playerId,
          nearestPlayersIds: nearestPlayersIds,
        });
      } catch (error) {
        console.log("TODO: Unable to load data", error);
      }
    };

    if (!playerDetails) loadSkaterDetails();
    if (!nearestPlayerIds) loadNearestPlayers();
  }, [dispatch, navigate, playerDetails, playerId, nearestPlayerIds]);

  if (!playerDetails) return <div>Loading...</div>;

  return (
    <>
      <div>{playerDetails.name}</div>
      <div>{playerDetails.playerId}</div>
      <div>{playerDetails.team}</div>
      <Avatar src={LOGOS[playerDetails.team]} alt={playerDetails.team}>
        {playerDetails.team}
      </Avatar>
      {nearestPlayerDetails ? (
        nearestPlayerDetails.map((player) => (
          <div key={player?.playerId}>{player?.name}</div>
        ))
      ) : (
        <CircularProgress />
      )}
    </>
  );
}

export default Player;
