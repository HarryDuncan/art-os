import { ColorEffectProps } from "../../../buildShader.types";
import { createColorVectorString } from "../../../helpers/createColorVectorString";

export const colorTransformation = (
  colorName: string,
  effectProps: ColorEffectProps
) => {
  const colorAsVector = createColorVectorString(
    effectProps.color,
    effectProps.opacity
  );
  return `
        vec4 ${colorName} = ${colorAsVector};
        `;
};
