export const mapResponseToObject = (responseArray, object) => {
  const returnObject = {};
  Object.keys(object).forEach((key, index) => {
    if (index <= responseArray.length - 1) {
      returnObject[key] = responseArray[index];
    }
  });
  return returnObject;
};
