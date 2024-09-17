import { useEffect, useState } from "react";
import BasicTable from "../components/Table";

export type Skater = {
  playerId: number;
  name: string;
};

function Stats() {
  const [skaters, setSkaters] = useState<Skater[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);

  useEffect(() => {
    fetch("/skaters")
      .then((res) => res.json())
      .then((data) => {
        setSkaters(data);
        const headers = Object.keys(data[0]).map(
          (key) => key.charAt(0).toUpperCase() + key.slice(1),
        );
        setHeaders(headers);
      });
  }, []);

  return <BasicTable headers={headers} rows={skaters}></BasicTable>;
}

export default Stats;
