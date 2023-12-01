export const reduceFunctions = (requiredFunctions) => {
  const allFunctions = requiredFunctions.flatMap(
    (functionArray) => functionArray
  );
  const uniqueFunctions = {};
  allFunctions.forEach((id, functionDefinition) => {
    if (!uniqueFunctions[id]) {
      uniqueFunctions[id] = functionDefinition;
    }
  });
  return uniqueFunctions;
};
