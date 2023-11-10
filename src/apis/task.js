import axiosClient from "@/libs/axios";

const TASK_ENDPOINT = {
  all: "/tasks",
  get: "/tasks",
};

const all = async (params) => {
  const { data } = await axiosClient.get(TASK_ENDPOINT.all, { params });
  return data;
};

const get = async (id) => {
  const { data } = await axiosClient.get(`${TASK_ENDPOINT.get}/${id}`);
  return data;
};

export const taskService = { all, get };
