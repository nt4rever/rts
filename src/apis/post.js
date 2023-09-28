import axiosClient from "@/libs/axios";

export const getPost = async (id) => {
  const { data } = await axiosClient.get(`/posts/${id}`);
  return data;
};

