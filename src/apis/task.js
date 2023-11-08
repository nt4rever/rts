import axiosClient from "@/libs/axios";

const TASK_ENDPOINT = {
  all: "/tasks",
};

const all = async (params) => {
  const { data } = await axiosClient.get(TASK_ENDPOINT.all, { params });
  return data;
};

export const taskService = { all };
