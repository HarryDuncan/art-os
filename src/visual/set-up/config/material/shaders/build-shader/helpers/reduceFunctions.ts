import { ShaderFunction } from "../buildShader.types";

export const reduceFunctions = (
  requiredFunctions: ShaderFunction[][]
): ShaderFunction[] => {
  const allFunctions = requiredFunctions.flatMap(
    (functionArray) => functionArray
  );
  const uniqueFunctions = {};
  allFunctions.forEach(({ id, functionDefinition }) => {
    if (!uniqueFunctions[id]) {
      uniqueFunctions[id] = functionDefinition;
    }
  });

  return Object.keys(uniqueFunctions).map((key) => ({
    id: key,
    functionDefinition: uniqueFunctions[key],
  }));
};
