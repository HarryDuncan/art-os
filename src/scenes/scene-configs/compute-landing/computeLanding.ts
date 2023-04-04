import { InteractiveThreeScene } from "visual/components/interactive/scene/InteractiveScene";
import { ASSET_TAG, ASSET_TYPES } from "visual/hooks/use-assets/types";
import { formatSceneData } from "./formatSceneData";
import computeConfig from "./config.json";
import {
  ANIMATION_FUNCTION_TYPES,
  GENERIC_TARGET_IDENTIFIERS,
} from "visual/animation/animation.constants";
import {
  AnimationConfig,
  CustomAnimationConfig,
} from "visual/animation/animation.types";

const infoText = [
  {
    name: "compute-geometry",
    url: "../assets/models/hjd/Compute.obj",
    assetType: ASSET_TYPES.Geometry,
  },
  {
    name: "name-geometry",
    url: "../assets/models/hjd/solo-exhibition.obj",
    assetType: ASSET_TYPES.Geometry,
  },
  {
    name: "opening-geometry",
    url: "../assets/models/hjd/opening.obj",
    assetType: ASSET_TYPES.Geometry,
  },
  {
    name: "dates-geometry",
    url: "../assets/models/hjd/exhibition-dates.obj",
    assetType: ASSET_TYPES.Geometry,
  },
  {
    name: "zero-geometry",
    url: "../assets/models/hjd/zero.obj",
    assetType: ASSET_TYPES.Geometry,
  },
  {
    name: "one-geometry",
    url: "../assets/models/hjd/one.obj",
    assetType: ASSET_TYPES.Geometry,
  },
];
const models = [
  {
    name: "nymph-geometry",
    url: "../assets/models/nymph1.obj",
    assetType: ASSET_TYPES.Geometry,
  },
];

const lines = [
  {
    name: "hjdcurves1-geometry",
    url: "../assets/models/hjd-lines/line-1.obj",
    assetType: ASSET_TYPES.Geometry,
  },
  {
    name: "hjdcurves2-geometry",
    url: "../assets/models/hjd-lines/line-2.obj",
    assetType: ASSET_TYPES.Geometry,
  },
  {
    name: "hjdcurves3-geometry",
    url: "../assets/models/hjd-lines/line-3.obj",
    assetType: ASSET_TYPES.Geometry,
  },
  {
    name: "hjdcurves4-geometry",
    url: "../assets/models/hjd-lines/line-4.obj",
    assetType: ASSET_TYPES.Geometry,
  },
];
const materials = [
  {
    name: "matcap-text",
    id: "compute-text",
    url: `../assets/textures/matcaps/compute-text.jpg`,
    assetType: ASSET_TYPES.Texture,
    assetTag: [ASSET_TAG.MATERIAL.MATCAP],
  },
];

export const computeLanding = (sceneConfig) => {
  const { animationConfig } = computeConfig[0];
  return {
    threeJsParams: {
      camera: { position: { x: 0, y: 0, z: 5 } },
      controls: {
        hasOrbitControls: true,
      },
    },
    assets: [...models, ...lines, ...infoText, ...materials],

    sceneFunctions: {
      onTimeUpdate: (scene: InteractiveThreeScene) => {
        scene.animationManager.startAnimation(scene, "binary-rotate");
        scene.animationManager.startAnimation(scene, "move-lights");
      },
    },
    interactions: [],

    formatSceneData,
    animations: [
      {
        animationId: "binary-rotate",
        targetIdentifier: "binary",
        animationFunctionType: ANIMATION_FUNCTION_TYPES.ALL,
        animationConfig: animationConfig[0] as AnimationConfig,
      },
      {
        animationId: "move-lights",
        targetIdentifier: GENERIC_TARGET_IDENTIFIERS.LIGHTS,
        animationFunction: ANIMATION_FUNCTION_TYPES.ALL,
        animationConfig: animationConfig[1] as AnimationConfig,
      },
      {
        animationId: "camera-fly",
        targetIdentifier: GENERIC_TARGET_IDENTIFIERS.CAMERA,
        animationFunction: ANIMATION_FUNCTION_TYPES.ALL,
        animationConfig: animationConfig[2] as AnimationConfig,
      },
    ] as CustomAnimationConfig[],
  };
};
