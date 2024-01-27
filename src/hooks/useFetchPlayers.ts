import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import { Player } from "../types";

const API_BASE_URL = "/api/v1";

const useFetchPlayers = (
  currentPage: number = 1,
  levelFilter: string = "",
  searchTerm: string = "",
  pageSize: number = 10
) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [totalPlayers, setTotalPlayers] = useState<number>(0);
  const [suspects, setSuspects] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);

  const isInitialRender = useRef(true);

  useEffect(() => {
    setTotalPages(Math.ceil(totalPlayers / pageSize));
  }, [totalPlayers, pageSize]);

  const fetchPlayers = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        start: ((currentPage - 1) * pageSize).toString(),
        n: pageSize.toString(),
        level: levelFilter,
        search: searchTerm.toLowerCase(),
      });

      const response = await axios.get(
        `${API_BASE_URL}/players?${params.toString()}`
      );

      const fetchedPlayers: Player[] = response.data.map((player: Player) => ({
        ...player,
        name: player.name.toUpperCase(),
        status: suspects.has(player.id) ? "suspect" : "ok",
      }));

      setPlayers(fetchedPlayers);
      setTotalPlayers(parseInt(response.headers["x-total"]));
    } catch (error) {
      setError("Failed to fetch players");
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, levelFilter, searchTerm, pageSize, suspects]);

  const fetchSuspects = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/players/suspects`);
      setSuspects(new Set(response.data));
    } catch (error) {
      setError("Failed to fetch suspects");
    }
  }, []);

  const debouncedFetchPlayers = useCallback(
    debounce(fetchPlayers, 500, {
      leading: false,
      trailing: true,
    }),
    [fetchPlayers]
  );

  useEffect(() => {
    if (isInitialRender.current) {
      fetchSuspects();
      isInitialRender.current = false;
    }
  }, []);

  useEffect(() => {
    debouncedFetchPlayers();
    return () => debouncedFetchPlayers.cancel();
  }, [debouncedFetchPlayers]);

  return {
    players,
    totalPlayers,
    currentPage,
    pageSize,
    suspects,
    isLoading,
    error,
    totalPages,
  };
};

export default useFetchPlayers;
