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

function renderCellContent(
  column: Column,
  player: Player,
  suspects: Set<number>
) {
  if (column.id === "status") {
    return suspects.has(player.id) ? "Suspect" : "OK";
  }

  return column.transform
    ? column.transform(player[column.id as keyof Player])
    : player[column.id as keyof Player];
}

function renderRow(player: Player, suspects: Set<number>) {
  return (
    <TableRow key={player.id}>
      {columns.map((column) => (
        <TableCell key={column.id}>
          {renderCellContent(column, player, suspects)}
        </TableCell>
      ))}
    </TableRow>
  );
}

interface TournamentTableProps {
  players: Player[];
  suspects: Set<number>;
  handleFilterSelect: (event: SelectChangeEvent) => void;
}

export default function TournamentTable({
  players,
  suspects,
  handleFilterSelect,
}: TournamentTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="tournament-table" size="small">
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
                  <LevelFilter onChange={handleFilterSelect} />
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {players.map((player) => renderRow(player, suspects))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
