import { SeverityPill } from "@/components/severity-pill";
import {
  Avatar,
  Box,
  Card,
  Stack,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import { useTranslation } from "next-i18next";
import { Scrollbar } from "src/components/scrollbar";

const statusMap = {
  PENDING: "secondary",
  CANCELED: "error",
  DONE: "success",
};

export const TasksTable = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
  } = props;

  const { t } = useTranslation();

  return (
    <Card>
      <Scrollbar>
        <Box>
          <Table>
            <TableBody>
              {items.map((task) => {
                return (
                  <TableRow hover key={task.id}>
                    <TableCell width={50}>
                      <Avatar src={task.ticket.images[0]} variant="rounded" />
                    </TableCell>
                    <TableCell>
                      <Stack spacing={1}>
                        <Typography
                          variant="body1"
                          sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: "2",
                            WebkitBoxOrient: "vertical",
                          }}
                        >
                          {task.ticket.title}
                        </Typography>
                        <Typography variant="body2">
                          {`${t("dashboard.task.expires_at")}: ${format(
                            new Date(task.expires_at),
                            "HH:mm dd/MM/yyyy"
                          )}`}
                        </Typography>
                        <Box
                          display="flex"
                          sx={{
                            display: {
                              xs: "flex",
                              sm: "none",
                            },
                          }}
                        >
                          <SeverityPill color={statusMap[task.status]}>
                            {t(`dashboard.task.status.${task.status}`)}
                          </SeverityPill>
                        </Box>
                      </Stack>
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        display: {
                          xs: "none",
                          sm: "table-cell",
                        },
                      }}
                    >
                      <SeverityPill color={statusMap[task.status]}>
                        {t(`dashboard.task.status.${task.status}`)}
                      </SeverityPill>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};
