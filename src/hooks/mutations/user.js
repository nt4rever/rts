import { userService } from "@/apis/user";
import { useMutation } from "@tanstack/react-query";

export const useProfileMutation = () =>
  useMutation({
    mutationFn: userService.updateProfile,
  });