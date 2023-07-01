import { Object3D, Texture } from "three";
import {
  ComponentProps,
  ThreeJsComponentType,
} from "visual/display/scene-elements/components/threeJsComponents.types";
import { MaterialConfig } from "visual/display/materials/materials.types";
import { LightConfigs } from "visual/display/scene-elements/lights/lights.types";
import { ThreeJsParams } from "visual/display/hooks/use-three-js/types";

export type SceneComponentConfig = {
  id: string;
  componentType: ThreeJsComponentType;
  componentProps: ComponentProps;
  materialConfig?: MaterialConfig;
};

export type SceneProperties = {
  viewWidth: string;
  viewHeight: string;
  backgroundColor: string;
  backgroundUrl: string;
  background?: Texture;
};

export type SceneData = {
  threeJs: ThreeJsParams;
  meshes: Object3D[];
  sceneComponents: Object3D[];
  lights: LightConfigs[];
  sceneProperties: SceneProperties;
  // TODO -type
  interactionComponents?: any;
};
