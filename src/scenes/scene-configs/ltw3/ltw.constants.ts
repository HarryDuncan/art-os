import { MeshPhongMaterial } from "three";
import { ANIMATION_TYPES } from "visual/helpers/animation/animation.types";
import { AXIS } from "visual/helpers/three-dimension-space/position/position.types";

export const LOGO_ANIMATION_CONFIG = {
  animationType: ANIMATION_TYPES.SPIN,
  animationProperties: {
    speed: 0.05,
    rotationAxis: AXIS.Z,
    animationDurationMilis: -1,
    animationPauseMilis: -1,
    repeatAnimation: true,
  },
};

export const CONFIG_INDEX = 0;

export const CONFIGS = [
  {
    background: "blue-mag",
    directionalLightColor: "#cc10b3",
    ambientLightColor: "#ad0a74",
    pointLightColor: "#cc10b3",
    marchingCubeMaterial: new MeshPhongMaterial({
      specular: 0xcc10b3,
      shininess: 10,
    }),
  },
  {
    background: "pinky-red",
    directionalLightColor: "",
    ambientLightColor: "",
    pointLightColor: "",
    marchingCubeMaterial: new MeshPhongMaterial({
      specular: 0x111111,
      shininess: 250,
    }),
  },
  {
    background: "blue",
    directionalLightColor: "",
    ambientLightColor: "",
    pointLightColor: "",
    marchingCubeMaterial: new MeshPhongMaterial({
      specular: 0x934832,
      shininess: 250,
    }),
  },
  {
    background: "orange-red",
    directionalLightColor: "#cc7931",
    ambientLightColor: "#cc040e",
    pointLightColor: "#c99000",
    marchingCubeMaterial: new MeshPhongMaterial({
      specular: 0xf5da42,
      shininess: 10,
    }),
  },
  {
    background: "green",
    directionalLightColor: "",
    ambientLightColor: "",
    pointLightColor: "",
    marchingCubeMaterial: new MeshPhongMaterial({
      specular: 0x111111,
      shininess: 250,
    }),
  },
];
