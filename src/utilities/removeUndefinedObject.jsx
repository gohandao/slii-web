export const removeUndefinedObject = (object) => {
  return Object.fromEntries(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(object).filter(([k, v]) => {
      return v !== undefined && v !== null && v !== "";
    })
  );
};
