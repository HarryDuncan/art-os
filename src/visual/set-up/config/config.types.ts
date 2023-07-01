import { CustomAnimationConfig } from "visual/display/animation/animation.types";
import { LightConfigs } from "visual/display/scene-elements/lights/lights.types";
import { ThreeDPosition } from "visual/display/helpers/three-dimension-space/position/position.types";
import { MaterialConfig } from "visual/display/materials/materials.types";
import { SceneComponentConfig } from "visual/display/components/interactive-scene";
import { InteractionConfig } from "interaction/interactions.types";
import { Asset } from "visual/set-up/assets/use-assets/types";
import { Object3D } from "three";
import { GeometryConfig } from "../assets/geometry/geometry.types";
import { CameraConfig } from "visual/set-up/config/three-js/use-camera/camera.types";

export type ExtendedMesh = Object3D<Event> & { groupId?: string; material? };
export type RandomizationConfig = {
  instanceCount: number;
  boundingBoxConfig: {
    width: number;
    height: number;
    depth: number;
    center: Partial<ThreeDPosition>;
  };
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
};

export type ThreeJSConfig = {
  camera?: CameraConfig;
  controls?: {
    hasOrbitControls: boolean;
  };
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
  globalMaterialConfigs: MaterialConfig[];
  animationConfig: CustomAnimationConfig[];
  lightConfig: LightConfigs[];
  sceneComponentConfigs?: SceneComponentConfig[];
  interactionConfig?: InteractionConfig[];
  threeJsConfig: ThreeJSConfig;
  scenePropertiesConfig: ScenePropertiesConfig;
};
