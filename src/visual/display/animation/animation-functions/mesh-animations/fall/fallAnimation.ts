import { Mesh } from "three";
import { FallParams } from "visual/display/animation/animation.types";

const DEFAULT_FALL_PARAMS = {
  bottom: -15,
  top: 15,
  speed: 0.07,
  direction: -1,
};

export const fallAnimation = (
  mesh: Mesh,
  time: number,
  fallParams: Partial<FallParams>
) => {
  const { direction, bottom, top, speed } = getDefaultFallParameters(
    fallParams
  );
  mesh.position.x +=
    Math.sin(1.26 * time * 0.003 * (1.03 + 0.5 * Math.cos(0.21))) * 0.02;
  mesh.position.y += speed * direction;
  mesh.position.z +=
    Math.cos(1.32 * time * 0.01 * Math.sin(0.92 + 0.53)) * 0.007;
  if (direction === -1) {
    if (mesh.position.y < bottom) {
      mesh.position.y = top;
    }
  } else if (mesh.position.y > top) {
    mesh.position.y = bottom;
  }
};

const getDefaultFallParameters = (
  parsedFallParams: Partial<FallParams> | undefined
) => {
  return { ...DEFAULT_FALL_PARAMS, ...parsedFallParams };
};
