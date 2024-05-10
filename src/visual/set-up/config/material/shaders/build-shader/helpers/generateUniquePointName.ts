export const generateUniquePointName = (
  pointName: string,
  pointParent: string | undefined
) => {
  if (pointParent) {
    return `${pointName}_${pointParent}`;
  }
  return pointName;
};
