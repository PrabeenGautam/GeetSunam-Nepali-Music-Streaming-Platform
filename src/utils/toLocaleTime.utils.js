export const toLocaleTime = (timeStamp) => {
  const d = new Date(timeStamp);
  return d.toLocaleTimeString();
};
