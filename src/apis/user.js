import axiosClient from "@/libs/axios";

const USER_ENDPOINT = {
  me: "/users/me",
  updateProfile: "/users/profile",
  uploadAvatar: "/users/avatar",
};

const me = async () => {
  const { data } = await axiosClient.get(USER_ENDPOINT.me);
  return data;
};

const updateProfile = async (dto) => {
  await axiosClient.patch(USER_ENDPOINT.updateProfile, dto);
};

const uploadAvatar = async (dto) => {
  const formData = new FormData();
  formData.append("avatar", dto.avatar);
  
  await axiosClient.post(USER_ENDPOINT.uploadAvatar, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const userService = { me, updateProfile, uploadAvatar };
