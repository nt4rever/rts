import CommonTaskRow from "@/components/Task/common-task-row";
import MapLink from "@/components/Task/map-link";
import { SeverityPill } from "@/components/severity-pill";
import { reportStatusMap } from "@/constants/report-status";
import { evidenceTypeMap } from "@/constants/task-status";
import { baseFormatDateTime } from "@/utils/time";
import styled from "@emotion/styled";
import {
  Card,
  CardHeader,
  Collapse,
  IconButton,
  Stack,
  Typography,
  capitalize
} from "@mui/material";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { ChevronDown } from "react-feather";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const ReportInformation = (props) => {
  const { data } = props;
  const { t } = useTranslation();
  const [evidenceExpanded, setEvidenceExpanded] = useState(false);
  const handleEvidenceExpand = () => {
    setEvidenceExpanded((prev) => !prev);
  };

  return (
    <Stack spacing={3}>
      <Card>
        <CardHeader title={t("dashboard.report.report-information")} />
        <CommonTaskRow title="ID" content={data.id} />
        <CommonTaskRow title={t("common.title")} content={data.title} />
        <CommonTaskRow
          title={t("common.description")}
          content={data.description}
        />
        <CommonTaskRow
          title={t("common.created_by")}
          content={`${data.created_by.first_name || ""} ${
            data.created_by.last_name
          }`}
        />
        <CommonTaskRow
          title={t("common.created_at")}
          content={baseFormatDateTime(data.created_at)}
        />
        <CommonTaskRow
          title={t("common.updated_at")}
          content={baseFormatDateTime(data.updated_at)}
        />
        <CommonTaskRow title={t("common.area")} content={data.area?.name} />
        <CommonTaskRow title={t("common.location")} hasChild>
          <Stack direction="row" spacing={2}>
            <Typography variant="body2">{`${data.lat}, ${data.lng}`}</Typography>
            <MapLink lat={data.lat} lng={data.lng} />
          </Stack>
        </CommonTaskRow>
        <CommonTaskRow title={t("common.status")} hasChild>
          <SeverityPill color={reportStatusMap[data.status]}>
            {t(`dashboard.report.status.${data.status}`)}
          </SeverityPill>
        </CommonTaskRow>
        <CommonTaskRow title={t("common.images")} hasChild>
          <Stack direction="row" gap={1} flexWrap="wrap">
            {data.images.map((img) => (
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
        <CommonTaskRow
          title={t("common.severity-level")}
          content={data.severity_level || "-"}
        />
        <CommonTaskRow
          title={t("common.resolve-message")}
          content={data.resolve_message || "-"}
        />
        <CommonTaskRow
          title={t("common.close-message")}
          content={data.close_message || "-"}
        />
        <CommonTaskRow
          title={capitalize(t("common.views"))}
          content={data.view_count}
        />
        <CommonTaskRow title={t("common.vote")} content={data.score} />
      </Card>
      {data.evidences?.length > 0 && (
        <Card>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ px: 3, py: 4 }}
          >
            <Typography variant="h6">{t("common.evidences")}</Typography>
            <ExpandMore
              expand={evidenceExpanded}
              onClick={handleEvidenceExpand}
              aria-expanded={evidenceExpanded}
              aria-label="show more"
            >
              <ChevronDown />
            </ExpandMore>
          </Stack>
          <Collapse in={evidenceExpanded}>
            {data?.evidences?.map((evidence) => (
              <div key={evidence.id}>
                <CommonTaskRow
                  title={t("common.role.VOLUNTEER")}
                  content={`${evidence.created_by.first_name || ""} ${
                    evidence.created_by.last_name
                  }`}
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
                <CommonTaskRow title={t("common.location")} hasChild>
                  <Stack direction="row" spacing={2}>
                    <Typography variant="body2">{`${evidence.lat}, ${evidence.lng}`}</Typography>
                    <MapLink lat={evidence.lat} lng={evidence.lng} />
                  </Stack>
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
              </div>
            ))}
          </Collapse>
        </Card>
      )}
    </Stack>
  );
};

export default ReportInformation;
