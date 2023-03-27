import { Texture } from "three";
import { MeshConfig } from "visual/helpers/assets/geometry/geometry.types";
import { MarchingCubes } from "../../three-js-components/components";
import { LightConfigs } from "../../three-js-components/lights/lights.types";
import {
  ComponentProps,
  ThreeJsComponentType,
} from "../../three-js-components/components/threeJsComponents.types";
import { InteractiveThreeScene as InteractiveScene } from "./InteractiveScene";

export type InteractiveSceneFunctions = {
  onTimeUpdate: (material: InteractiveScene) => void;
};

export type SceneObjectType = typeof MarchingCubes | any;
export type SceneObject = {
  name: string;
  object: SceneObjectType;
};

export type SceneComponentConfig = {
  componentType: ThreeJsComponentType;
  componentProps: ComponentProps;
};

export type SceneProperties = {
  background?: Texture;
};
export type SceneData = {
  isSceneDataInitialized: boolean;
  meshConfigs?: MeshConfig[];
  sceneComponents?: SceneComponentConfig[];
  lights?: LightConfigs[];
  sceneObjects?: SceneObject[];
  sceneProperties?: SceneProperties;
};
