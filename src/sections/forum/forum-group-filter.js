import { FormControl, MenuItem, Select, Stack } from "@mui/material";

const ForumGroupFilter = (props) => {
  return (
    <Stack direction="row" spacing={1}>
      <FormControl>
        <Select size="small" name="order" defaultValue="created_at|desc">
          <MenuItem disabled>Sort By</MenuItem>
          <MenuItem value="score|desc">Hot</MenuItem>
          <MenuItem value="created_at|desc">Newest</MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <Select size="small" name="order" defaultValue="created_at|desc">
          <MenuItem disabled>Sort By</MenuItem>
          <MenuItem value="score|desc">Hot</MenuItem>
          <MenuItem value="created_at|desc">Newest</MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <Select size="small" name="order" defaultValue="created_at|desc">
          <MenuItem disabled>Status</MenuItem>
          <MenuItem value="score|desc">Hot</MenuItem>
          <MenuItem value="created_at|desc">New</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
};

export default ForumGroupFilter;
