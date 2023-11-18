import axiosClient from "@/libs/axios";

const AUTH_ENDPOINT = {
  login: "/auth/sign-in",
  register: "/auth/sign-up",
  logout: "/auth/logout",
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

export const authService = { login, logout, register };
