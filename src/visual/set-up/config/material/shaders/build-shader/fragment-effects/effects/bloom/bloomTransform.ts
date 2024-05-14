import { OpacityEffectProps } from "../../../types";

export const bloomTransform = (
  fragName: string,
  previousFragName: string,
  bloomParameters: OpacityEffectProps
) => {
  const { declareInTransform } = bloomParameters;
  const fragmentColorInstantiation = `vec4 ${fragName} = ${previousFragName};`;
  const transformation = `
        // BLOOM
        ${declareInTransform ? fragmentColorInstantiation : ""}
      `;
  return { fragmentColorInstantiation, transformation };
};
