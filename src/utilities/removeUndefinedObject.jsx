export const removeUndefinedObject = (object) => {
  return Object.fromEntries(
    Object.entries(object).filter(([k, v]) => v !== undefined)
  );
};
