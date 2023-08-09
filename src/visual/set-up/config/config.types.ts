import { CustomAnimationConfig } from "visual/display/animation/animation.types";
import { LightConfigs } from "visual/display/scene-elements/lights/lights.types";
import { ThreeDPosition } from "visual/display/helpers/three-dimension-space/position/position.types";
import { MaterialConfig } from "visual/display/materials/materials.types";
import { InteractionConfig } from "interaction/interactions.types";
import { Asset } from "visual/set-up/assets/asset.types";
import { GeometryConfig } from "../assets/geometry/geometry.types";
import { CameraConfig } from "visual/set-up/config/three-js/use-camera/camera.types";
import {
  ComponentProps,
  SceneElementType,
} from "visual/display/scene-elements/components/threeJsComponents.types";

export type RandomizationConfig = {
  instanceCount: number;
  boundingBoxConfig: {
    width: number;
    height: number;
    depth: number;
    center: Partial<ThreeDPosition>;
  };
};

export type SceneComponentConfig = {
  id: string;
  componentType: SceneElementType;
  componentProps: ComponentProps;
  materialConfig?: MaterialConfig;
};
export type MeshComponentConfig = {
  id: string;
  geometryId?: string;
  rotation?: Partial<ThreeDPosition>;
  position?: Partial<ThreeDPosition>;
  materialConfig: MaterialConfig;
  randomizationConfig?: RandomizationConfig;
  geometryConfig?: GeometryConfig;
  groupId?: string;
  meshType: string;
};

export type ControlConfig = {
  autoRotate: boolean;
  autoRotateSpeed: number;
  dampingFactor: number;
  enabled: boolean;
  enableDamping: boolean;
  enablePan: boolean;
  enableRotate: boolean;
  enableZoom: boolean;
  keyPanSpeed: number;
  keys: {
    LEFT: string;
    UP: string;
    RIGHT: string;
    BOTTOM: string;
  };
  maxAzimuthAngle: number;
  maxDistance: number;
  maxPolarAngle: number;
  maxZoom: number;
  minAzimuthAngle: number;
  minDistance: number;
  minPolarAngle: number;
  minZoom: number;
  mouseButtons: {
    LEFT: number;
    MIDDLE: number;
    RIGHT: number;
  };

  rotateSpeed: number;
  screenSpacePanning: boolean;
  touches: {
    ONE: number;
    TWO: number;
  };
};
export type ThreeJSConfig = {
  camera?: CameraConfig;
  controls?: ControlConfig;
};

export type ScenePropertiesConfig = {
  viewWidth?: string;
  viewHeight?: string;
  backgroundColor?: string;
  backgroundUrl?: string;
};
export type SceneConfig = {
  assets?: Asset[];
  meshComponentConfigs: MeshComponentConfig[];
  meshTransforms?: any;
  globalMaterialConfigs: MaterialConfig[];
  animationConfig: CustomAnimationConfig[];
  lightConfig: LightConfigs[];
  sceneComponentConfigs?: SceneComponentConfig[];
  interactionConfig?: InteractionConfig[];
  threeJsConfig: ThreeJSConfig;
  scenePropertiesConfig: ScenePropertiesConfig;
};
