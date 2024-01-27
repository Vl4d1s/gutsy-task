import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { SelectChangeEvent } from "@mui/material";

import { Column, Player } from "../../types";
import { columns } from "../tournament-table/column-config";
import LevelFilter from "../level-filter";

function renderCellContent(column: Column, player: Player) {
  if (column.id === "status") {
    return player.isSuspect ? "Suspect" : "OK";
  }

  return column.transform
    ? column.transform(player[column.id as keyof Player])
    : player[column.id as keyof Player];
}

function renderRow(player: Player) {
  return (
    <TableRow key={player.id}>
      {columns.map((column) => (
        <TableCell key={column.id}>
          {renderCellContent(column, player)}
        </TableCell>
      ))}
    </TableRow>
  );
}

interface TournamentTableProps {
  players: Player[];
  levelFilter: string;
  handleFilterSelect: (event: SelectChangeEvent) => void;
}

export default function TournamentTable({
  players,
  levelFilter,
  handleFilterSelect,
}: TournamentTableProps) {
  const renderedRows = players.map((player) => renderRow(player));

  return (
    <TableContainer component={Paper}>
      <Table aria-label="tournament-table" size="small">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align={column.align}
                style={{ minWidth: column.minWidth }}
              >
                {column.label}
                {column.label === "Level" && (
                  <>
                    <span style={{ margin: "0 10px" }} />
                    <LevelFilter
                      onChange={handleFilterSelect}
                      levelFilter={levelFilter}
                    />
                  </>
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>{renderedRows}</TableBody>
      </Table>
    </TableContainer>
  );
}
