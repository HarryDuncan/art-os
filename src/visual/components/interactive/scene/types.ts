import { Mesh, Object3D, Texture } from "three";

import { LightConfigs } from "../../../scene-elements/lights/lights.types";

import { InteractiveThreeScene as InteractiveScene } from "./InteractiveScene";
import {
  ComponentProps,
  ThreeJsComponentType,
} from "visual/scene-elements/components/threeJsComponents.types";
import { MarchingCubes } from "three/examples/jsm/objects/MarchingCubes";
import { MaterialConfig } from "visual/helpers/materials/materials.types";
import { MeshConfig } from "utils/assets/geometry/geometry.types";

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
  meshes?: Object3D[];
  sceneComponents?: Object3D[];
  lights?: LightConfigs[];
  sceneObjects?: SceneObject[];
  sceneProperties?: SceneProperties;
};
