import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

interface IProps {
  headers: string[];
  rows: Dic[];
}

interface Dic {
  [key: string]: string | number;
}

export default function BasicTable({ headers, rows }: IProps) {
  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {headers.map((header, i) => (
              <TableCell key={i}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={i}>
              {Object.keys(row).map((column, j) =>
                j === 0 ? (
                  <TableCell key={i + j} component="th" scope="row">
                    {row[column]}
                  </TableCell>
                ) : (
                  <TableCell key={i + j}>{row[column]}</TableCell>
                ),
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
