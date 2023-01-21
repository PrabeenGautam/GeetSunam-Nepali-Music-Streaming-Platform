import { Skeleton } from "@mui/material";

function FeaturedSkeleton() {
  return (
    <Skeleton
      sx={{ bgcolor: "grey.900" }}
      variant="rectangle"
      animation={"wave"}
      width={"100%"}
      height={"50vh"}></Skeleton>
  );
}

export default FeaturedSkeleton;
