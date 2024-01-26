import { Column } from "../../types";

export const columns: Column[] = [
  {
    id: "id",
    label: "ID",
    minWidth: 10,
  },
  {
    id: "name",
    label: "Name",
    transform: (value: string) =>
      value.charAt(0).toUpperCase() + value.slice(1),
  },
  {
    id: "level",
    label: "Level",
  },
  {
    id: "score",
    label: "Score",
  },
  {
    id: "status",
    label: "Status",
  },
];
