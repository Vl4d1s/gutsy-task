import { Container, Typography, Box, Grid } from "@mui/material";
// import "./App.css";
import TournamentTable from "./components/tournament-table/tournament-table";
import useTournamentData from "./hooks/useTournamentData";

function App() {
  const { players, suspects, loading, error, total, setLevel } =
    useTournamentData(0, 100);

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
              onFilterChange={(level: string) => setLevel(level)}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default App;
