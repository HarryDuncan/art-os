import { Object3D, Texture } from "three";
import { LightConfigs } from "../../../scene-elements/lights/lights.types";
import { InteractiveThreeScene as InteractiveScene } from "./InteractiveScene";
import {
  ComponentProps,
  ThreeJsComponentType,
} from "visual/scene-elements/components/threeJsComponents.types";
import { MaterialConfig } from "visual/helpers/materials/materials.types";

export type InteractiveSceneFunctions = {
  onTimeUpdate: (material: InteractiveScene) => void;
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
  sceneProperties?: SceneProperties;
};
