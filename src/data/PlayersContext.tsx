import { Dispatch, ReactNode } from "react";
import { createContext, useReducer } from "react";

export type Skater = {
  playerId: number;
  name: string;
};

export enum PlayersActionType {
  "SET_SKATERS" = "setSkaters",
  "SET_SKATER_DETAILS" = "setSkaterDetails",
}

type SkaterState = Skater;
type SkaterDetailsState = Skater; // FIXME: real type

type PlayersDataState = {
  skaters: SkaterState[];
  skaterDetails: SkaterDetailsState[];
};

type SetSkatersAction = {
  type: PlayersActionType.SET_SKATERS;
  skaters: SkaterState[];
};

type SetSkaterDetailsAction = {
  type: PlayersActionType.SET_SKATER_DETAILS;
  skaterDetail: SkaterDetailsState;
};

type PlayersAction = SetSkatersAction | SetSkaterDetailsAction;
export type PlayersDispatch = Dispatch<PlayersAction>;

export const PlayersContext = createContext<PlayersDataState | null>(null);
export const PlayersDispatchContext = createContext<PlayersDispatch | null>(
  null,
);

export const PlayersProvider = ({ children }: { children: ReactNode }) => {
  const [playersData, dispatch] = useReducer(
    playersReducer,
    initialPlayersData,
  );

  return (
    <PlayersContext.Provider value={playersData}>
      <PlayersDispatchContext.Provider value={dispatch}>
        {children}
      </PlayersDispatchContext.Provider>
    </PlayersContext.Provider>
  );
};

const playersReducer = (players: PlayersDataState, action: PlayersAction) => {
  switch (action.type) {
    case PlayersActionType.SET_SKATERS: {
      const { skaters, ...rest } = players;
      return {
        skaters: action.skaters,
        ...rest,
      };
    }
    case PlayersActionType.SET_SKATER_DETAILS: {
      const { skaterDetails, ...rest } = players;
      const hasSkaterDetails = skaterDetails.find(
        (skater) => skater.playerId === action.skaterDetail.playerId,
      );
      return {
        skaterDetails: hasSkaterDetails
          ? skaterDetails
          : [...skaterDetails, action.skaterDetail],
        ...rest,
      };
    }
    default: {
      throw Error("Unknown action");
    }
  }
};

export const getSkaters = async (): Promise<Skater[]> => {
  const data = await fetch("/skaters");
  const skaters = (await data.json()) as Skater[];
  return skaters;
};

export const getSkater = async (playerId: number): Promise<Skater> => {
  const data = await fetch(`/players/${playerId}`);
  if (data.ok) {
    const skater = (await data.json()) as Skater;
    return skater;
  }
  throw new Error(/*TODO: pass api error*/);
};

const initialPlayersData: PlayersDataState = {
  skaters: [],
  skaterDetails: [],
};
