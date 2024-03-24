import { shaderSafeFloat } from "visual/utils/conversion/shaderConversions";
import { PointsEffectProps } from "../../../buildShader.types";
import { pointsPerspective } from "./pointsPerspective";

export const pointsTransform = (
  previousPointName: string,
  effectProps: PointsEffectProps
) => {
  const { pointSize, perspectiveConfig } = effectProps;
  const perspective = pointsPerspective(previousPointName, perspectiveConfig);
  const transformation = `gl_PointSize = ${
    perspective.length ? perspective : shaderSafeFloat(pointSize)
  };`;

  return transformation;
};
