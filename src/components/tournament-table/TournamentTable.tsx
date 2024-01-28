import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import { Chip, SelectChangeEvent } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";

import LevelFilter from "./LevelFilter";
import { columns } from "./column-config";
import { Column, LevelFilterValue, Player } from "../../types";

interface TournamentTableProps {
  players: Player[];
  levelFilter: LevelFilterValue;
  handleFilterSelect: (event: SelectChangeEvent) => void;
}

export default function TournamentTable({
  players,
  levelFilter,
  handleFilterSelect,
}: TournamentTableProps) {
  function renderCellContent(column: Column, player: Player) {
    if (column.id === "status") {
      if (player.status === "ok") {
        return <Chip label="trustworthy" color="success" size="small" />;
      } else if (player.status === "suspect") {
        return <Chip label="suspect" color="warning" size="small" />;
      }
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
