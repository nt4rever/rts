import axiosClient from "@/libs/axios";

const AREA_ENDPOINT = {
  all: "/areas",
};

const all = async (params = undefined) => {
  const { data } = await axiosClient.get(AREA_ENDPOINT.all, { params });
  return data;
};

export const areaService = { all };
