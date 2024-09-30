import "../App.css";
import LOGOS from "../data/logos";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../utils/routes";
import { useContext, useEffect } from "react";
import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CircularProgress,
  Stack,
} from "@mui/material";
import {
  getNearestPlayers,
  getSkaterDetails,
  PlayersActionType,
  PlayersContext,
  PlayersDispatch,
  PlayersDispatchContext,
} from "../data/PlayersContext";

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
      <Helmet>
        <title>{`Player: ${playerDetails.name}`}</title>
      </Helmet>
      <Box>
        <div>{playerDetails.name}</div>
        <Avatar src={LOGOS[playerDetails.team]} alt={playerDetails.team}>
          {playerDetails.team}
        </Avatar>
        {nearestPlayerDetails ? (
          <Stack direction="row">
            {nearestPlayerDetails.map((player) => (
              <Card key={player?.playerId}>
                <CardActionArea>
                  <Link
                    to={`${ROUTES.PLAYERS.path}/${player?.playerId}`}
                    className="unstyledLink"
                  >
                    <CardContent>
                      <div>{player?.name}</div>
                    </CardContent>
                  </Link>
                </CardActionArea>
              </Card>
            ))}
          </Stack>
        ) : (
          <CircularProgress />
        )}
      </Box>
    </>
  );
}

export default Player;
