import logoCol from "../assets/logo/CAR_dark.svg";
import logoCar from "../assets/logo/COL_dark.svg";
import { TeamEnums } from "./PlayersContext";

const LOGOS: Record<TeamEnums, string> = {
  COL: logoCol,
  CAR: logoCar,
};

export default LOGOS;
