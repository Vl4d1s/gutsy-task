import { MenuItem, Select, SelectChangeEvent } from "@mui/material";

interface LevelFilterProps {
  handleFilterSelect: (event: SelectChangeEvent) => void;
}

const LevelFilter = ({ handleFilterSelect }: LevelFilterProps) => (
  <Select
    label="Filter by Level"
    onChange={handleFilterSelect}
    defaultValue=""
    size="small"
  >
    <MenuItem value="">All Levels</MenuItem>
    <MenuItem value="rookie">Rookie</MenuItem>
    <MenuItem value="amateur">Amateur</MenuItem>
    <MenuItem value="pro">Pro</MenuItem>
  </Select>
);

export default LevelFilter;
