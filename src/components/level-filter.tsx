import { MenuItem, Select, SelectChangeEvent } from "@mui/material";

interface LevelFilterProps {
  onChange: (event: SelectChangeEvent) => void;
  levelFilter: string;
}

const LevelFilter = ({ onChange, levelFilter }: LevelFilterProps) => (
  <Select
    label="Filter by Level"
    onChange={onChange}
    defaultValue="all"
    size="small"
    value={!levelFilter ? "all" : levelFilter}
  >
    <MenuItem value="all">All</MenuItem>
    <MenuItem value="rookie">Rookie</MenuItem>
    <MenuItem value="amateur">Amateur</MenuItem>
    <MenuItem value="pro">Pro</MenuItem>
  </Select>
);

export default LevelFilter;
