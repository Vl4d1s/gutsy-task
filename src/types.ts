export interface Player {
  id: number;
  name: string;
  level: "rookie" | "amateur" | "pro";
  score: number;
  isSuspect?: boolean;
}

type ExtrasColumn = "status";

export interface TournamentData {
  players: Player[];
  suspects: Set<number>;
  loading: boolean;
  error: string | null;
  total: number;
}

export interface Column {
  id: keyof Player | ExtrasColumn;
  label: string;
  minWidth?: number;
  align?: "right";
  transform?: (value: any) => any;
}
