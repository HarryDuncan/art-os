import { Object3D, Texture } from "three";
import { MeshConfig } from "visual/helpers/assets/geometry/geometry.types";

import { LightConfigs } from "../../../scene-elements/lights/lights.types";

import { InteractiveThreeScene as InteractiveScene } from "./InteractiveScene";
import {
  ComponentProps,
  ThreeJsComponentType,
} from "visual/scene-elements/components/threeJsComponents.types";
import { MarchingCubes } from "three/examples/jsm/objects/MarchingCubes";
import { MaterialConfig } from "visual/helpers/materials/materials.types";

export type InteractiveSceneFunctions = {
  onTimeUpdate: (material: InteractiveScene) => void;
};

export type SceneObjectType = typeof MarchingCubes | any;
export type SceneObject = {
  name: string;
  object: SceneObjectType;
};

export type SceneComponentConfig = {
  id: string;
  componentType: ThreeJsComponentType;
  componentProps: ComponentProps;
  materialConfig: MaterialConfig;
};

export type SceneProperties = {
  background?: Texture;
};
export type SceneData = {
  isSceneDataInitialized: boolean;
  meshConfigs?: MeshConfig[];
  sceneComponents?: Object3D[];
  lights?: LightConfigs[];
  sceneObjects?: SceneObject[];
  sceneProperties?: SceneProperties;
};
