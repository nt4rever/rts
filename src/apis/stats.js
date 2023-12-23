import axiosClient from "@/libs/axios";

const STATS_ENDPOINT = {
  report: "/stats/tickets",
  personal: "/stats/personal",
};

const report = async (params = undefined) => {
  const { data } = await axiosClient.get(STATS_ENDPOINT.report, { params });
  return data;
};

const personal = async () => {
  const { data } = await axiosClient.get(STATS_ENDPOINT.personal);
  return data;
};

export const statsService = { report, personal };
