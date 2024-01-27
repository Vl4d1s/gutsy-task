import { Box, Grid, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const range = 2;
  let start = Math.max(currentPage - range, 1);
  let end = Math.min(currentPage + range, totalPages);

  const pageNumbers = Array.from(
    { length: end - start + 1 },
    (_, i) => start + i
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={7}>
        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            size="small"
            color="secondary"
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
          >
            First
          </Button>
          <Button
            variant="contained"
            size="small"
            color="secondary"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          {pageNumbers.map((number) => (
            <Button
              key={number}
              variant={number === currentPage ? "outlined" : "contained"}
              size="small"
              onClick={() => onPageChange(number)}
              disabled={number === currentPage}
            >
              {number}
            </Button>
          ))}
          <Button
            variant="contained"
            size="small"
            color="secondary"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
          <Button
            variant="contained"
            size="small"
            color="secondary"
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
          >
            Last
          </Button>
        </Stack>
      </Grid>
      <Grid item xs={5}>
        <Stack direction="row" spacing={1}>
          <Typography variant="body2">
            Page{" "}
            <strong>
              {currentPage} of {totalPages}
            </strong>{" "}
            | Go to page:
          </Typography>
          <TextField
            type="number"
            size="small"
            defaultValue={currentPage}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) : 1;
              onPageChange(page);
            }}
            sx={{ ml: 2 }}
          />
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Pagination;
