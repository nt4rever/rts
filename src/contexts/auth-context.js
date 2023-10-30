/* eslint-disable react-hooks/exhaustive-deps */
import { userService } from "@/apis/user";
import useAuthStore from "@/store/useAuthStore";
import { getAccessToken } from "@/utils/storage";
import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useRef } from "react";

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props) => {
  const { children } = props;
  const ref = useRef(false);
  const { login } = useAuthStore();
  const getMeQuery = useQuery({
    queryKey: ["me"],
    queryFn: userService.me,
    enabled: false,
  });

  useEffect(() => {
    if (ref.current) return;
    ref.current = true;

    const loadAccessToken = async () => {
      const accessToken = getAccessToken();
      let user = undefined;
      if (accessToken) {
        user = (await getMeQuery.refetch()).data;
        if (user) login(user);
      }
    };
    loadAccessToken();
  }, []);

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
