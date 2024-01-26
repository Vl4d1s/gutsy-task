import "./App.css";
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
      <h1>Tournament Data</h1>
    </div>
  );
}

export default App;
