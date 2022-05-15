import { Vector2 } from "three";

const PARAMS = {
  test: 1,
  progress: { value: 0.5 },
  mainColor: 0xffcf79,
  particleDiffusion: { value: 1 },
  baseNoiseIteration: { value: 5 },
  noiseDiffusion: { value: 0.76 },
  noisePrecision: { value: 2.61 },
  lightningDiffusion: { value: 0.01 },

  lightningThickness: { value: 0.79 },
  lightningPower: { value: 0.07 },
  vanishDirection: { value: new Vector2(-1, 0) },

  useBloom: true,

  bloom: {
    strength: 2,
    radius: 0.16,
    threshold: 0.7,
  },
};

export const DIRECTION_KEYS = {
  LEFT_TO_RIGHT: "left-to-right",
  RIGHT_TO_LEFT: "right-to-left",
  TOP_TO_BOTTOM: "top-to-bottom",
  BOTTOM_TO_TOP: "bottom-to-top",
};
export const DIRECTIONS = {
  LEFT_TO_RIGHT: new Vector2(-1, 0),
  RIGHT_TO_LEFT: new Vector2(1, 0),
  TOP_TO_BOTTOM: new Vector2(0, -1),
  BOTTOM_TO_TOP: new Vector2(0, 1),
};

export default PARAMS;
