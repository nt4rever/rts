
import { userService } from "@/apis/user";
import { useQuery } from "@tanstack/react-query";

/**
 * Get user profile
 * @param {{ enabled: boolean }} props 
 * @example useGetMe({ enabled: false })
 * @returns 
 */
export const useGetMe = (props = {}) => useQuery(["me"], userService.me, {
  ...props,
});