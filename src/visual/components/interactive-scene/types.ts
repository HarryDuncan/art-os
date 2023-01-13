import Particle from "scenes/scene-configs/particle-rain/classes/Particle";
import { MeshConfig } from "visual/helpers/geometry/three-geometry/types";
import { InteractiveThreeScene as InteractiveScene } from "./InteractiveScene";

export type InteractiveSceneFunctions = {
  onTimeUpdate: (material: InteractiveScene) => void;
};

export type SceneObjectType = Particle[] | any;
export type SceneObject = {
  name: string;
  object: SceneObjectType;
};

export type SceneData = {
  isSceneDataInitialized: boolean;
  meshConfigs?: MeshConfig[];
  sceneObjects?: SceneObject[];
};
