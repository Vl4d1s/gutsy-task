import ClearIcon from "@mui/icons-material/Clear";
import { TextField, InputAdornment, IconButton } from "@mui/material";

interface SearchProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  searchTerm: string;
}

const Search = ({ searchTerm, onChange, onClear }: SearchProps) => {
  return (
    <TextField
      size="small"
      variant="outlined"
      label="Search by name, ID, level, or score."
      value={searchTerm}
      onChange={onChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={onClear} size="small">
              <ClearIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default Search;
