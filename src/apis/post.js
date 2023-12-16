import axiosClient from "@/libs/axios";

const POST_ENDPOINT = {
  all: "/posts",
  get: "/posts",
};

const all = async (params = undefined) => {
  const { data } = await axiosClient.get(POST_ENDPOINT.all, { params });
  return data;
};

const get = async (id) => {
  const { data } = await axiosClient.get(`${POST_ENDPOINT.get}/${id}`);
  return data;
};

export const postService = { all, get };
