import { FormControl, MenuItem, Select } from "@mui/material";
import { useRouter } from "next/router";

export default function LanguageSwitcher() {
  const router = useRouter();

  return (
    <div>
      <FormControl>
        <Select
          size="small"
          inputProps={{ "aria-label": "Without label" }}
          value={router.locale}
          onChange={(e) =>
            router.push(
              {
                pathname: router.pathname,
                query: router.query,
              },
              null,
              { locale: e.target.value }
            )
          }
          name="language"
          MenuProps={{
            disableScrollLock: true,
          }}
        >
          <MenuItem value="vi">Tiếng Việt</MenuItem>
          <MenuItem value="en">English</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
