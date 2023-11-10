import axiosClient from "@/libs/axios";

const TASK_ENDPOINT = {
  all: "/tasks",
  get: "/tasks",
  cancel: (id) => `/tasks/${id}/cancel`,
  update: "/tasks",
};

const all = async (params) => {
  const { data } = await axiosClient.get(TASK_ENDPOINT.all, { params });
  return data;
};

const get = async (id) => {
  const { data } = await axiosClient.get(`${TASK_ENDPOINT.get}/${id}`);
  return data;
};

const cancel = async (id) => {
  const { data } = await axiosClient.post(TASK_ENDPOINT.cancel(id));
  return data;
};

export const taskDto = (data) => {
  const formData = new FormData();
  formData.append("content", data.content);
  formData.append("lat", data.lat);
  formData.append("lng", data.lng);
  formData.append("type", data.type);
  data.images.forEach((file) => formData.append("images", file));
  return formData;
};

const update = async (dto) => {
  const formData = taskDto(dto);
  const { data } = await axiosClient.patch(
    `${TASK_ENDPOINT.update}/${dto.id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data;
};

export const taskService = { all, get, cancel, update };
