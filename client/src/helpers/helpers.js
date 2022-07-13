const isEmpty = (obj) => {
  if (obj === null || obj === undefined) return false;

  return Object.keys(obj).length === 0;
};

export { isEmpty };
