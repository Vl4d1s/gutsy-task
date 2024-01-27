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
    <Stack
      direction="row"
      spacing={1}
      justifyContent="center"
      alignItems="center"
    >
      <Button
        variant="contained"
        size="small"
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
      >
        First
      </Button>
      <Button
        variant="contained"
        size="small"
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
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
      <Button
        variant="contained"
        size="small"
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        Last
      </Button>
    </Stack>
  );
};

export default Pagination;
