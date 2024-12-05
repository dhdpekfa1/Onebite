export const delay = async (ms: number) => {
  return new Promise((res) => {
    setTimeout(() => {
      res("");
    }, ms);
  });
};
