export const randomize = (list: any) => {
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    if (i == j) continue;
    const k = list[i];
    list[i] = list[j];
    list[j] = k;
  }
  return list;
};
