import { authService } from "@/apis/auth";
import { useMutation } from "@tanstack/react-query";

export const useLogoutMutation = () =>
  useMutation({
    mutationFn: authService.logout,
  });
