import { shaderSafeFloat } from "visual/utils/conversion/shaderConversions";
import { PointPerspectiveConfig } from "../../../buildShader.types";

export const pointsPerspective = (
  pointName: string,
  perspectiveConfig?: PointPerspectiveConfig
) => {
  if (perspectiveConfig) {
    const floor = shaderSafeFloat(perspectiveConfig.floor);
    const max = shaderSafeFloat(perspectiveConfig.ceiling);
    const scaleFactor = shaderSafeFloat(perspectiveConfig.scaleFactor);
    const divisor = shaderSafeFloat(perspectiveConfig.divisor);
    return `max(${floor}, min(${max}, ${scaleFactor} *  (${divisor} / ${pointName}.z)))`;
  }
  return "";
};
