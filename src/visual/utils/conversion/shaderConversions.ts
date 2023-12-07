import { PositionConfig } from "../three-dimension-space/position/position.types";
import { positionConfigToPosition } from "./conversion";

export const shaderSafeFloat = (value: number) => {
  return value.toFixed(2);
};

export const shaderSafeVector = (position: PositionConfig) => {
  const formattedPositon = positionConfigToPosition(position);
  return `vec3(${shaderSafeFloat(formattedPositon.x)}, ${shaderSafeFloat(
    formattedPositon.y
  )}, ${shaderSafeFloat(formattedPositon.z)})`;
};
