import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";
import type { Dispatch, SetStateAction } from "react";

interface StatusFilterProps {
  status: string;
  setStatus: Dispatch<SetStateAction<string>>;
}

const filterOptions = [
  { value: "pending", label: "Pending" },
  { value: "processing", label: "Processing" },
  { value: "shipped", label: "Shipped" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
];

const StatusFilter = ({ status, setStatus }: StatusFilterProps) => {
  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value);
  };
  return (
    <FormControl size="small">
      <InputLabel>Filter Status</InputLabel>

      <Select
        size="small"
        value={status}
        onChange={handleChange}
        sx={{ width: 200, color: "text.primary" }}
        label="Filter Status"
      >
        <MenuItem value="">
          <em>--None</em>
        </MenuItem>
        {filterOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default StatusFilter;
