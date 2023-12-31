import CommonTaskRow from "@/components/Task/common-task-row";
import MapLink from "@/components/Task/map-link";
import { SeverityPill } from "@/components/severity-pill";
import { reportStatusMap } from "@/constants/report-status";
import { evidenceTypeMap, taskStatusMap } from "@/constants/task-status";
import { baseFormatDateTime } from "@/utils/time";
import { Card, CardHeader, Divider, Stack, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import { Calendar } from "react-feather";

const TaskInformation = (props) => {
  const { data } = props;
  const { t } = useTranslation();

  return (
    <>
      <Stack spacing={2}>
        <Typography variant="h5">{`${t("dashboard.report.verify-report")} ${
          data.ticket.id
        }`}</Typography>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="body2">{t("common.created_at")}</Typography>
          <Calendar size={20} color="rgb(108, 115, 127)" />
          <Typography variant="subtitle2">
            {baseFormatDateTime(data.created_at)}
          </Typography>
          <SeverityPill color={taskStatusMap[data.status]}>
            {t(`dashboard.task.status.${data.status}`)}
          </SeverityPill>
        </Stack>
      </Stack>
      <Stack spacing={3}>
        {data.note && (
          <Card>
            <CommonTaskRow title={t("common.note")} content={data.note} />
          </Card>
        )}
        <Card>
          <CardHeader title={t("dashboard.report.report-information")} />
          <CommonTaskRow title="ID" content={data.ticket.id} />
          <CommonTaskRow
            title={t("common.title")}
            content={data.ticket.title}
          />
          <CommonTaskRow
            title={t("common.description")}
            content={data.ticket.description}
          />
          <CommonTaskRow
            title={t("common.created_by")}
            content={`${data.ticket.created_by.first_name} ${data.ticket.created_by.last_name}`}
          />
          <CommonTaskRow
            title={t("common.created_at")}
            content={baseFormatDateTime(data.ticket.created_at)}
          />
          <CommonTaskRow
            title={t("common.updated_at")}
            content={baseFormatDateTime(data.ticket.updated_at)}
          />
          <CommonTaskRow title={t("common.location")} hasChild>
            <Stack direction="row" spacing={2}>
              <Typography variant="body2">{`${data.ticket.lat}, ${data.ticket.lng}`}</Typography>
              <MapLink lat={data.ticket.lat} lng={data.ticket.lng} />
            </Stack>
          </CommonTaskRow>
          <CommonTaskRow title={t("common.status")} hasChild>
            <SeverityPill color={reportStatusMap[data.ticket.status]}>
              {t(`dashboard.report.status.${data.ticket.status}`)}
            </SeverityPill>
          </CommonTaskRow>
          <CommonTaskRow title={t("common.images")} hasChild>
            <Stack direction="row" gap={1} flexWrap="wrap">
              {data.ticket.images.map((img) => (
                <img
                  key={img}
                  src={img}
                  style={{
                    aspectRatio: "1/1",
                    width: "300px",
                  }}
                />
              ))}
            </Stack>
          </CommonTaskRow>
        </Card>
        <Card>
          <CardHeader title={t("common.area")} />
          <CommonTaskRow
            title={t("common.name")}
            content={data.ticket.area.name}
          />
          <CommonTaskRow
            title={t("common.address")}
            content={data.ticket.area.address}
          />
          <CommonTaskRow title={t("common.location")} hasChild>
            <Stack direction="row" spacing={2}>
              <Typography variant="body2">{`${data.ticket.area.lat}, ${data.ticket.area.lng}`}</Typography>
              <MapLink lat={data.ticket.area.lat} lng={data.ticket.area.lng} />
            </Stack>
          </CommonTaskRow>
          <CommonTaskRow
            title={t("common.radius")}
            content={`${data.ticket.area.radius} (m)`}
          />
        </Card>
        {data.ticket?.evidences?.length > 0 && (
          <Card>
            <CardHeader title={t("common.evidences")} />
            {data.ticket?.evidences?.map((evidence) => (
              <>
                <CommonTaskRow
                  title={t("common.role.VOLUNTEER")}
                  content={`${evidence.created_by.first_name} ${evidence.created_by.last_name}`}
                />
                <CommonTaskRow
                  title={t("common.content")}
                  content={evidence.content}
                />
                <CommonTaskRow title={t("common.status")} hasChild>
                  <SeverityPill color={evidenceTypeMap[evidence.type]}>
                    {t(`dashboard.report.status.${evidence.type}`)}
                  </SeverityPill>
                </CommonTaskRow>
                <CommonTaskRow
                  title={t("common.created_at")}
                  content={baseFormatDateTime(evidence.created_at)}
                />
                <CommonTaskRow title={t("common.images")} hasChild>
                  <Stack direction="row" gap={1} flexWrap="wrap">
                    {evidence.images.map((img) => (
                      <img
                        key={img}
                        src={img}
                        style={{
                          aspectRatio: "1/1",
                          width: "200px",
                        }}
                      />
                    ))}
                  </Stack>
                </CommonTaskRow>
                <Divider />
              </>
            ))}
          </Card>
        )}
      </Stack>
    </>
  );
};

export default TaskInformation;
