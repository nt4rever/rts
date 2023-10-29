export const ACCESS_TOKEN_STORAGE_KEY = "rts_access_token";
export const REFRESH_TOKEN_STORAGE_KEY = "rts_refresh_token";

export const setTokens = ({
  accessToken = undefined,
  refreshToken = undefined,
}) => {
  try {
    if (accessToken)
      window.localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, accessToken);
    if (refreshToken)
      window.localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, refreshToken);
  } catch (error) {}
};

export const clearTokens = () => {
  try {
    window.localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
    window.localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
  } catch (error) {}
};

export const getAccessToken = () => {
  let accessToken = undefined;
  if (typeof window !== "undefined") {
    accessToken = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
  }
  return accessToken;
};

export const getRefreshToken = () => {
  let refreshToken = undefined;
  if (typeof window !== "undefined") {
    refreshToken = localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY);
  }
  return refreshToken;
};
