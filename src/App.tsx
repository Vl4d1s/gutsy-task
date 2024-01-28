import {
  Container,
  Typography,
  Box,
  Grid,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";

import { LevelFilterValue } from "./types";
import Loader from "./components/shared/Loader";
import useFetchPlayers from "./hooks/useFetchPlayers";
import Search from "./components/tournament-table/Search";
import ErrorComponent from "./components/shared/ErrorMessage";
import Pagination from "./components/tournament-table/Pagination";
import TournamentTable from "./components/tournament-table/TournamentTable";

function App() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [levelFilter, setLevelFilter] = useState<LevelFilterValue>("");

  const { players, error, isLoading, totalPlayers, totalPages } =
    useFetchPlayers(currentPage, levelFilter, searchTerm);

  const handleSearchChange = (e: SelectChangeEvent) => {
    setSearchTerm(e.target.value);
    currentPage !== 1 && setCurrentPage(1);
  };

  const handleSearchClear = () => {
    setSearchTerm("");
    currentPage !== 1 && setCurrentPage(1);
  };

  const handleFilterSelect = (e: SelectChangeEvent) => {
    setLevelFilter(e.target.value as LevelFilterValue);
    currentPage !== 1 && setCurrentPage(1);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  if (isLoading) return <Loader />;
  if (error) return <ErrorComponent message={error} />;

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h2" component="h1" gutterBottom align="center">
              XT tournament - Final results
            </Typography>
            <Typography variant="h5" component="h5" gutterBottom align="center">
              Total Players: {totalPlayers} | Page{" "}
              <strong>
                {currentPage} of {totalPages}
              </strong>{" "}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Search
              searchTerm={searchTerm}
              onChange={handleSearchChange}
              onClear={handleSearchClear}
            />
            <Box m={2} />
            <TournamentTable
              players={players}
              handleFilterSelect={handleFilterSelect}
              levelFilter={levelFilter}
            />
            <Box m={2} />
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default App;
