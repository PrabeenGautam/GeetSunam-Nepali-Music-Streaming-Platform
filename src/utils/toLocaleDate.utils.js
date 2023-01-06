export const toLocaleDate = (timeStamp) => {
  const d = new Date(timeStamp);
  const options = { year: "numeric", month: "short", day: "numeric" };
  return d.toLocaleDateString("en-US", options);
};
