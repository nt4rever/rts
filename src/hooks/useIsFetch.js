import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import nProgress from "nprogress";
import { useEffect } from "react";

export default function useIsFetch() {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  useEffect(() => {
    if (isFetching + isMutating) {
      nProgress.start();
    }

    return () => {
      nProgress.done();
    };
  }, [isFetching, isMutating]);

  return isFetching + isMutating;
}
