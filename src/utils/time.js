import { format as formatDateTime } from "date-fns";

export function baseFormatDateTime(
  timeString,
  format = "dd/MM/yyyy HH:mm",
  options = {}
) {
  try {
    return formatDateTime(new Date(timeString), format, options);
  } catch (error) {
    return "-";
  }
}
