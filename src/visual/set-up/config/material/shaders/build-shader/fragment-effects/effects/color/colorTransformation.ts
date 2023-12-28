import { createColorVectorString } from "../../../helpers/createColorVectorString";

export const colorTransformation = (colorName, effectProps) => {
  const colorAsVector = createColorVectorString(
    effectProps.color,
    effectProps.opacity
  );
  return `
        vec4 ${colorName} = ${colorAsVector};
        `;
};
