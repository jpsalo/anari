import MuiTable from "@mui/material/Table";
import MuiTableBody from "@mui/material/TableBody";
import MuiTableCell from "@mui/material/TableCell";
import MuiTableContainer from "@mui/material/TableContainer";
import MuiTableFooter from "@mui/material/TableFooter";
import MuiTableHead from "@mui/material/TableHead";
import MuiTablePagination from "@mui/material/TablePagination";
import MuiTableRow from "@mui/material/TableRow";
import { ChangeEvent, useState } from "react";
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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = rows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  return (
    <>
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
            {visibleRows.map((row, i) => (
              <MuiTableRow key={i}>
                {row.map((cell, j) => (
                  <TableCell key={i + j} index={j} content={cell} />
                ))}
              </MuiTableRow>
            ))}
          </MuiTableBody>
          <MuiTableFooter>
            <MuiTableRow>
              <MuiTablePagination
                count={rows.length}
                page={page}
                rowsPerPage={rowsPerPage}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </MuiTableRow>
          </MuiTableFooter>
        </MuiTable>
      </MuiTableContainer>
    </>
  );
}
