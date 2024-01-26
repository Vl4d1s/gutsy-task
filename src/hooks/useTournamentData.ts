import { useState, useEffect, useRef } from "react";

const API_BASE_URL = "/api/v1";

export interface Player {
  id: number;
  name: string;
  level: "rookie" | "amateur" | "pro";
  score: number;
}

interface TournamentData {
  players: Player[];
  suspects: Set<number>;
  loading: boolean;
  error: string | null;
  total: number;
}

const useTournamentData = (
  start: number,
  n: number,
  level?: string,
  search?: string
): TournamentData => {
  const [state, setState] = useState<TournamentData>({
    players: [],
    suspects: new Set(),
    loading: true,
    error: null,
    total: 0,
  });

  const suspectsFetched = useRef<boolean>(false);

  const fetchPlayers = async () => {
    const queryParams = new URLSearchParams({
      start: start.toString(),
      n: n.toString(),
      ...(level && { level }),
      ...(search && { search }),
    }).toString();

    const response = await fetch(`${API_BASE_URL}/players?${queryParams}`, {});

    if (!response.ok) throw new Error("Network response was not ok.");

    const data = await response.json();
    const total = parseInt(response.headers.get("x-total") || "0");

    setState((prevState) => ({
      ...prevState,
      players: data,
      total,
      loading: false,
    }));
  };

  const fetchSuspects = async () => {
    const response = await fetch(`${API_BASE_URL}/players/suspects`, {});

    if (!response.ok) throw new Error("Network response was not ok.");

    const data = await response.json();

    setState((prevState) => ({
      ...prevState,
      suspects: new Set(data),
    }));

    suspectsFetched.current = true;
  };

  useEffect(() => {
    fetchPlayers().catch((err) =>
      setState((prevState) => ({
        ...prevState,
        error: (err as Error).message,
        loading: false,
      }))
    );
  }, [start, n, level, search]);

  useEffect(() => {
    if (!suspectsFetched.current) {
      fetchSuspects().catch((err) =>
        setState((prevState) => ({
          ...prevState,
          error: (err as Error).message,
        }))
      );
    }
  }, []);

  return state;
};

export default useTournamentData;
