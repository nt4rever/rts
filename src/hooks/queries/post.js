import { postService } from "@/apis/post";
import { useQuery } from "@tanstack/react-query";

export const usePost = (id) =>
  useQuery(["post", id], () => postService.get(id));
