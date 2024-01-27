import { MenuItem, Select, SelectChangeEvent } from "@mui/material";

interface LevelFilterProps {
  onChange: (event: SelectChangeEvent) => void;
}

const LevelFilter = ({ onChange }: LevelFilterProps) => (
  <Select
    label="Filter by Level"
    onChange={onChange}
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
