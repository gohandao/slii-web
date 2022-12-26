export const removeUndefinedObject = (object: { [key: string]: any }) => {
  return Object.fromEntries(
    Object.entries(object).filter(([, value]) => {
      return value !== undefined && value !== null && value !== "";
    })
  );
};
