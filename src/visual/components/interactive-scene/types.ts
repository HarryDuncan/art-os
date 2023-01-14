import Particle from "scenes/scene-configs/particle-rain/classes/Particle";
import { MeshConfig } from "visual/helpers/geometry/three-geometry/types";
import { MarchingCubes } from "../three-js-components";
import { LightConfigs } from "../three-js-components/lights/lights.types";
import { COMPONENT_TYPES } from "../three-js-components/three-js-components.types";
import { InteractiveThreeScene as InteractiveScene } from "./InteractiveScene";

export type InteractiveSceneFunctions = {
  onTimeUpdate: (material: InteractiveScene) => void;
};

export type SceneObjectType = Particle[] | typeof MarchingCubes | any;
export type SceneObject = {
  name: string;
  object: SceneObjectType;
};

export type SceneComponentConfig = {
  name: string;
  componentType: COMPONENT_TYPES;
};
export type SceneData = {
  isSceneDataInitialized: boolean;
  meshConfigs?: MeshConfig[];
  sceneComponents?: SceneComponentConfig[];
  lights?: LightConfigs[];
  sceneObjects?: SceneObject[];
};
