import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { Player } from "../hooks/useTournamentData";

interface TournamentTableProps {
  players: Player[];
}

interface Column {
  id: keyof Player;
  label: string;
  minWidth?: number;
  align?: "right";
  transform?: (value: any) => any;
}

export default function TournamentTable({ players }: TournamentTableProps) {
  const columns: Column[] = [
    {
      id: "id",
      label: "ID",
    },
    {
      id: "name",
      label: "Name",
      transform: (value: string) =>
        value.charAt(0).toUpperCase() + value.slice(1),
    },
    {
      id: "level",
      label: "Level",
    },
    {
      id: "score",
      label: "Score",
    },
  ];

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="tournament-table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align={column.align}
                style={{ minWidth: column.minWidth }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {players.map((player) => (
            <TableRow key={player.id}>
              {columns.map((column) => (
                <TableCell key={column.id}>
                  {column.transform
                    ? column.transform(player[column.id])
                    : player[column.id]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
