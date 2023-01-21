import { Paper, Skeleton } from "@mui/material";

function NewlyReleased() {
  return (
    <Paper>
      <Skeleton
        sx={{ bgcolor: "grey.900" }}
        variant="rectangle"
        animation={"wave"}
        width={"250"}
        height={"250"}
      />
      <Skeleton
        sx={{ bgcolor: "grey.900" }}
        variant="rectangle"
        animation={"wave"}
        width={"168"}
        height={"226"}
      />
      <Skeleton
        sx={{ bgcolor: "grey.900" }}
        variant="rectangle"
        animation={"wave"}
        width={"168"}
        height={"226"}
      />
      <Skeleton
        sx={{ bgcolor: "grey.900" }}
        variant="rectangle"
        animation={"wave"}
        width={"168"}
        height={"226"}
      />
      <Skeleton
        sx={{ bgcolor: "grey.900" }}
        variant="rectangle"
        animation={"wave"}
        width={"168"}
        height={"226"}
      />
    </Paper>
  );
}

export default NewlyReleased;
