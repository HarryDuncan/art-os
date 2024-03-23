export const generateUniquePointName = (pointName, pointParent) => {
  if (pointParent) {
    return `${pointName}_${pointParent}`;
  }
  return pointName;
};
