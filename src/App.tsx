import "./App.css";
import TournamentTable from "./components/tournament-table";
import useTournamentData from "./hooks/useTournamentData";

function App() {
  const { players, suspects, loading, error, total } = useTournamentData(
    0,
    10,
    "rookie"
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  console.log(players, suspects, total);

  return (
    <div>
      <TournamentTable players={players} />
    </div>
  );
}

export default App;
