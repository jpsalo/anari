import { useContext, useEffect, useState } from "react";
import Table, { createCell, Row } from "../components/Table";
import {
  getSkaters,
  PlayersActionType,
  PlayersDispatch,
  PlayersDispatchContext,
  Skater,
} from "../data/PlayersContext";
import { ROUTES } from "../utils/routes";

function Stats() {
  const [headers, setHeaders] = useState<string[]>([]);
  const [rows, setRows] = useState<Row[]>([]);
  const dispatch = useContext(PlayersDispatchContext) as PlayersDispatch;

  const generateTable = (skaters: Skater[]) => {
    const rowsData = skaters.map((skater) => {
      return Object.entries(skater).map(([key, value]) => {
        let cell;
        if (key === "name") {
          const link = `${ROUTES.PLAYERS.path}/${skater.playerId}`;
          cell = createCell(value, link);
        } else {
          cell = createCell(value);
        }
        return cell;
      });
    }) as Row[];
    setRows(rowsData);
    const headers = Object.keys(skaters[0]).map(
      (key) => key.charAt(0).toUpperCase() + key.slice(1),
    );
    setHeaders(headers);
  };

  useEffect(() => {
    getSkaters().then((skaters) => {
      dispatch({
        type: PlayersActionType.SET_SKATERS,
        skaters: skaters,
      });
      generateTable(skaters);
    });
  }, [dispatch]);

  return <Table headers={headers} rows={rows}></Table>;
}

export default Stats;
