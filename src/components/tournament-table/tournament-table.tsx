import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { Column, Player } from "../../types";
import { columns } from "../tournament-table/column-config";
import { SelectChangeEvent } from "@mui/material";
import LevelFilter from "../level-filter";

interface TournamentTableProps {
  players: Player[];
  suspects: Set<number>;
  onFilterChange: (level: string) => void;
}

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

export default function TournamentTable({
  players,
  suspects,
  onFilterChange,
}: TournamentTableProps) {
  const handleFilterSelect = (event: SelectChangeEvent) => {
    onFilterChange(event.target.value as string);
  };

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
                {column.id === "level" && (
                  <LevelFilter handleFilterSelect={handleFilterSelect} />
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
