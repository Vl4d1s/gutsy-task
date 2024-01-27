import { TextField } from "@mui/material";

interface SearchProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchTerm: string;
}

const Search = ({ searchTerm, onChange }: SearchProps) => {
  return (
    <TextField
      size="small"
      variant="outlined"
      label="Search players by name, ID, level, or score."
      value={searchTerm}
      onChange={onChange}
    />
  );
};

export default Search;
