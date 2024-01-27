import { useState, useEffect, useRef } from "react";
import { Player } from "../types";

const API_BASE_URL = "/api/v1";

export interface TournamentData {
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
  const [players, setPlayers] = useState<Player[]>([]);
  const [suspects, setSuspects] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState<number>(0);

  // Ref to track the initial fetch for suspects
  const initialFetchCompleted = useRef<boolean>(false);

  const fetchPlayers = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        start: start.toString(),
        n: n.toString(),
        ...(level && { level }),
        ...(search && { search }),
      }).toString();

      const response = await fetch(`${API_BASE_URL}/players?${queryParams}`);
      if (!response.ok) throw new Error("Network response was not ok.");

      const data = await response.json();
      const totalNumber = parseInt(response.headers.get("x-total") || "0");

      setPlayers(data);
      setTotal(totalNumber);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const fetchSuspects = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/players/suspects`);
      if (!response.ok) throw new Error("Network response was not ok.");

      const data = await response.json();
      setSuspects(new Set(data));
    } catch (err) {
      setError((err as Error).message);
    }
  };

  useEffect(() => {
    if (!initialFetchCompleted.current) {
      fetchSuspects().catch((err) => setError((err as Error).message));
      initialFetchCompleted.current = true;
    }
  }, []);

  useEffect(() => {
    fetchPlayers().catch((err) => setError((err as Error).message));
  }, [start, n, level, search]);

  return { players, suspects, loading, error, total };
};

export default useTournamentData;
