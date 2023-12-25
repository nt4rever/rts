import axiosClient from "@/libs/axios";

const PAGE_ENDPOINT = {
  get: "/pages",
};

const get = async ({ type = "ABOUT", slug = undefined }) => {
  const { data } = await axiosClient.get(PAGE_ENDPOINT.get, {
    params: {
      type,
      slug,
    },
  });
  return data;
};

export const pageService = { get };
