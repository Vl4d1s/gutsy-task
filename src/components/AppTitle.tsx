import { Typography } from "@mui/material";

interface AppTitleProps {
  totalPlayers: number;
  currentPage: number;
  totalPages: number;
}

const AppTitle = ({ totalPlayers, currentPage, totalPages }: AppTitleProps) => (
  <>
    <Typography variant="h2" component="h1" gutterBottom align="center">
      XT tournament - Final results
    </Typography>
    <Typography variant="h5" component="h5" gutterBottom align="center">
      Total Players: {totalPlayers} | Page{" "}
      <strong>
        {currentPage} of {totalPages}
      </strong>{" "}
    </Typography>
  </>
);

export default AppTitle;
