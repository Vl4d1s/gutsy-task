import { Container, Typography, Box, Grid } from "@mui/material";
// import "./App.css";
import TournamentTable from "./components/tournament-table/tournament-table";
import useTournamentData from "./hooks/useTournamentData";
import { useState } from "react";

function App() {
  const [levelFilter, setLevelFilter] = useState<string>("");

  const handleFilterChange = (level: string) => {
    setLevelFilter(level);
  };

  const { players, suspects, loading, error, total } = useTournamentData(
    0,
    100,
    levelFilter
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h2" component="h1" gutterBottom align="center">
              XT tournament - Final results
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TournamentTable
              players={players}
              suspects={suspects}
              onFilterChange={handleFilterChange}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default App;
