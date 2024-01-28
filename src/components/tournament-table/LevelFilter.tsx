import { MenuItem, Select, SelectChangeEvent } from "@mui/material";

import { LevelFilterValue } from "../../types";

interface LevelFilterProps {
  onChange: (event: SelectChangeEvent<LevelFilterValue>) => void;
  levelFilter: LevelFilterValue;
}

const LevelFilter = ({ onChange, levelFilter }: LevelFilterProps) => {
  const levels: LevelFilterValue[] = ["all-levels", "rookie", "amateur", "pro"];

  return (
    <Select
      label="Filter by Level"
      onChange={onChange}
      defaultValue="all-levels"
      size="small"
      value={!levelFilter ? "all-levels" : levelFilter}
    >
      {levels.map((level) => (
        <MenuItem key={level} value={level}>
          {level.charAt(0).toUpperCase() + level.slice(1)}
        </MenuItem>
      ))}
    </Select>
  );
};

export default LevelFilter;
