import { Skeleton } from "@mui/material";

function FeaturedSkeleton({ width, height, borderRadius }) {
  return (
    <Skeleton
      sx={{
        bgcolor: "grey.900",
        borderRadius: borderRadius ? borderRadius : "0px",
      }}
      variant="rectangle"
      animation={"wave"}
      width={width ? width : "100%"}
      height={height ? height : "50vh"}></Skeleton>
  );
}

export default FeaturedSkeleton;
