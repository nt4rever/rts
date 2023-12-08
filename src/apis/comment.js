import axiosClient from "@/libs/axios";

const COMMENT_ENDPOINT = {
  voteTicket: (id) => `/comments/${id}/vote-ticket`,
  voteComment: (id) => `/comments/${id}/vote-comment`,
  create: "/comments",
  all: (id) => `/comments/${id}`,
  unVote: (id) => `/comments/${id}/un-vote`,
};

const voteTicket = async ({ id, upVote }) => {
  const { data } = await axiosClient.post(COMMENT_ENDPOINT.voteTicket(id), {
    upVote,
  });
  return data;
};

const voteComment = async ({ id, upVote }) => {
  const { data } = await axiosClient.post(COMMENT_ENDPOINT.voteComment(id), {
    upVote,
  });
  return data;
};

const create = async ({ id, content }) => {
  const { data } = await axiosClient.post(COMMENT_ENDPOINT.create, {
    ticket: id,
    content,
  });
  return data;
};

const all = async (payload) => {
  const { id, ...params } = payload;
  const { data } = await axiosClient.get(COMMENT_ENDPOINT.all(id), {
    params,
  });
  return data;
};

const unVote = async (payload) => {
  const { id, ...dto } = payload;
  const { data } = await axiosClient.post(COMMENT_ENDPOINT.unVote(id), dto);
  return data;
};

export const commentService = { create, all, voteTicket, voteComment, unVote };
