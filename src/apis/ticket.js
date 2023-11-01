import axiosClient from "@/libs/axios";

const TICKET_ENDPOINT = {
  create: "/tickets",
};

export const ticketDto = (data) => {
  const formData = new FormData();
  formData.append("area_id", data.area_id);
  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("lat", data.lat);
  formData.append("lng", data.lng);
  data.images.forEach((file) => formData.append("images", file));
  return formData;
};

const create = async (dto) => {
  const formData = ticketDto(dto);
  const { data } = await axiosClient.post(TICKET_ENDPOINT.create, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const ticketService = { create };
