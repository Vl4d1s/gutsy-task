import { Container, Typography, Box, Grid } from "@mui/material";
// import "./App.css";
import TournamentTable from "./components/tournament-table/tournament-table";
import useFetchPlayers from "./hooks/useFetchPlayers";
import { useEffect, useState } from "react";
import Search from "./components/search";
import Loader from "./components/loader";
import Pagination from "./components/pagination";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [levelFilter, setLevelFilter] = useState("");

  const { players, error, isLoading, totalPlayers } = useFetchPlayers(
    currentPage,
    levelFilter,
    searchTerm
  );

  const pageSize = 10;
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setTotalPages(Math.ceil(totalPlayers / pageSize));
  }, [totalPlayers, pageSize]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  if (isLoading) return <Loader />;
  if (error) return <div>Error: {error}</div>;

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
              onPageChange={handlePageChange}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default App;
