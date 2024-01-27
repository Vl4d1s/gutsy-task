import { Container, Typography, Box, Grid } from "@mui/material";
import { useState } from "react";

import TournamentTable from "./components/tournament-table/tournament-table";
import useFetchPlayers from "./hooks/useFetchPlayers";
import Search from "./components/tournament-table/search";
import Loader from "./components/shared/loader";
import Pagination from "./components/tournament-table/pagination";
import ErrorComponent from "./components/shared/error-message";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [levelFilter, setLevelFilter] = useState("");

  console.log("App");

  const { players, error, isLoading, totalPlayers, totalPages } =
    useFetchPlayers(currentPage, levelFilter, searchTerm);

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
              Total Players: {totalPlayers}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Search
              searchTerm={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Box m={2} />
            <TournamentTable
              players={players}
              handleFilterSelect={(e) => setLevelFilter(e.target.value)}
              levelFilter={levelFilter}
            />
            <Box m={2} />
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={(pageNumber: number) => {
                setCurrentPage(pageNumber);
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default App;
