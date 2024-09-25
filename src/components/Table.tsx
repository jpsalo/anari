import MuiTable from "@mui/material/Table";
import MuiTableBody from "@mui/material/TableBody";
import MuiTableCell from "@mui/material/TableCell";
import MuiTableContainer from "@mui/material/TableContainer";
import MuiTableHead from "@mui/material/TableHead";
import MuiTableRow from "@mui/material/TableRow";
import { Link } from "react-router-dom";

interface IProps {
  headers: string[];
  rows: Row[];
}

interface Cell {
  data: string | number;
  link: null | string;
}

export interface Row extends Array<Cell> {}

export const createCell = (data: any, link: string | null = null) => {
  return { data, link };
};

const TableCellContent = ({ content }: { content: Cell }) => {
  if (content.link) {
    return <Link to={content.link}>{content.data}</Link>;
  }
  return <span>{content.data}</span>;
};

const TableCell = ({ index, content }: { index: number; content: Cell }) => {
  if (index === 0) {
    return (
      <MuiTableCell component="th" scope="row">
        <TableCellContent content={content} />
      </MuiTableCell>
    );
  }
  return (
    <MuiTableCell>
      <TableCellContent content={content} />
    </MuiTableCell>
  );
};

export default function Table({ headers, rows }: IProps) {
  return (
    <MuiTableContainer>
      <MuiTable aria-label="simple table">
        <MuiTableHead>
          <MuiTableRow>
            {headers.map((header, i) => (
              <MuiTableCell key={i}>{header}</MuiTableCell>
            ))}
          </MuiTableRow>
        </MuiTableHead>
        <MuiTableBody>
          {rows.map((row, i) => (
            <MuiTableRow key={i}>
              {row.map((cell, j) => (
                <TableCell key={i + j} index={j} content={cell} />
              ))}
            </MuiTableRow>
          ))}
        </MuiTableBody>
      </MuiTable>
    </MuiTableContainer>
  );
}
