import * as api from "@/apis/post";
import { useQuery } from "@tanstack/react-query";

export const usePost = (id) => useQuery(["post", id], () => api.getPost(id));
