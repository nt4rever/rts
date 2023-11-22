import axiosClient from "@/libs/axios";

const AUTH_ENDPOINT = {
  login: "/auth/sign-in",
  register: "/auth/sign-up",
  logout: "/auth/logout",
  forgotPassword: "/auth/forgot-password",
  resetPassword: "/auth/reset-password",
};

const login = async ({ email, password }) => {
  const { data } = await axiosClient.post(AUTH_ENDPOINT.login, {
    email,
    password,
  });
  return data;
};

const register = async (payload) => {
  const { data } = await axiosClient.post(AUTH_ENDPOINT.register, payload);
  return data;
};

const logout = async ({ token }) => {
  await axiosClient.get(AUTH_ENDPOINT.logout, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const forgotPassword = async (payload) => {
  const { data } = await axiosClient.post(
    AUTH_ENDPOINT.forgotPassword,
    payload
  );
  return data;
};
const resetPassword = async (payload) => {
  const { data } = await axiosClient.post(AUTH_ENDPOINT.resetPassword, payload);
  return data;
};

export const authService = {
  login,
  logout,
  register,
  forgotPassword,
  resetPassword,
};
