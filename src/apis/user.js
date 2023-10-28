import axiosClient from "@/libs/axios";

const USER_ENDPOINT = {
  me: "/users/me",
  updateProfile: "/users/profile",
};

const me = async () => {
  const { data } = await axiosClient.get(USER_ENDPOINT.me);
  return data;
};

const updateProfile = async (dto) => {
  await axiosClient.patch(USER_ENDPOINT.updateProfile, dto);
};

export const userService = { me, updateProfile };
