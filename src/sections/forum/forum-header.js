import { ArrowIcon } from "@/assets/icon/arrow";
import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { useTranslation } from "next-i18next";
import NextLink from "next/link";
import ForumGroupFilter from "./forum-group-filter";
import { areaService } from "@/apis/area";
import { useQuery } from "@tanstack/react-query";

const ForumHeader = (props) => {
  const { area, setArea } = props;
  const { t } = useTranslation();
  const { data: areas } = useQuery({
    queryKey: ["area"],
    queryFn: () =>
      areaService.all({
        order: "name|asc",
      }),
  });
  const onAreaChange = (e) => {
    setArea(e.target.value);
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={6}>
        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            size="small"
            component={NextLink}
            href="/create-report"
          >
            &nbsp;{t("home.report-your-problem")}&nbsp;
            <ArrowIcon />
          </Button>
          <FormControl>
            <Select
              size="small"
              name="area"
              value={area}
              onChange={onAreaChange}
            >
              <MenuItem value={"ALL"}>{t("common.all-area")}</MenuItem>
              {areas?.map((item) => (
                <MenuItem value={item.id} key={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        display="flex"
        sx={{
          justifyContent: {
            xs: "flex-start",
            md: "flex-end",
          },
        }}
      >
        <ForumGroupFilter />
      </Grid>
    </Grid>
  );
};

export default ForumHeader;
