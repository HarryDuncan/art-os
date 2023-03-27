import { Vector3 } from "three";
import {
  AnimationType,
  ANIMATION_TYPES,
} from "visual/helpers/animation/animation.types";
import { AXIS } from "visual/helpers/three-dimension-space/position/position.types";

export const CONFIG_INDEX = 0;
export const ART_GEOMETRY_CONFIG = {
  scale: 0.02,
};
export const CONFIGS = [
  {
    nymph: {
      rotation: { x: 180, y: -110, z: 0 },
    },
    bezierCurve: {
      startPosition: new Vector3(10, 10, -10),
      endPosition: new Vector3(0, -3, 0),
      curveSize: 0,
    },
    color: "#1902b0",
    specular: "#0000ff",
  },
  {
    nymph: {
      rotation: { x: 0, y: 200, z: 0 },
    },
    bezierCurve: {
      startPosition: new Vector3(0, -10, 0),
      endPosition: new Vector3(0, 0, 0),
      curveSize: 0,
    },
    color: "#c70606",
    specular: "#ff0303",
  },
  {
    nymph: {
      rotation: { x: 0, y: 100, z: 0 },
    },
    bezierCurve: {
      startPosition: new Vector3(-10, 0, 0),
      endPosition: new Vector3(2, 0, 0),
      curveSize: 0,
    },
    color: "#047526",
    specular: "#00ff30",
  },
];

export const ANIMATION_CONFIG = {
  animationType: ANIMATION_TYPES.TRAVERSE as AnimationType,
  animationProperties: {
    animationDurationMilis: 4000,
    repeatAnimation: false,
    animationPauseMilis: 0,
    startPosition: CONFIGS[CONFIG_INDEX].bezierCurve.startPosition,
    endPosition: CONFIGS[CONFIG_INDEX].bezierCurve.endPosition,
    curveSize: 0,
  },
};

export const SPIN_ANIMATION_CONFIG = {
  animationType: ANIMATION_TYPES.SPIN as AnimationType,
  animationProperties: {
    speed: 0.005,
    rotationAxis: AXIS.Y,
    animationDurationMilis: -1,
    animationPauseMilis: -1,
    repeatAnimation: true,
  },
};
