import { Skeleton } from "@mui/material";

export const ForumSkeleton = () => {
  return (
    <div>
      <Skeleton variant="rounded" height={60} sx={{ marginY: 2 }} />
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="rounded" height={60} sx={{ marginY: 2 }} />
      <Skeleton variant="rounded" height={300} />
    </div>
  );
};
