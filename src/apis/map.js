import axiosClient from "@/libs/axios";

const MAP_ENDPOINT = {
  latLngArea: "/map/lat-lng-area",
  latLngTicket: "/map/lat-lng-ticket",
};

const mapArea = async (params) => {
  const { data } = await axiosClient.get(MAP_ENDPOINT.latLngArea, { params });
  return data;
};
const mapTicket = async (params) => {
  const { data } = await axiosClient.get(MAP_ENDPOINT.latLngTicket, { params });
  return data;
};

export const mapService = { mapArea, mapTicket };
