import { createContext, useContext } from "react";

export const ForumContext = createContext({});

export const useForumContext = () => useContext(ForumContext);
