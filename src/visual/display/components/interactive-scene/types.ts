import { Object3D, Texture } from "three";
import { SceneLight } from "visual/display/scene-elements/lights/lights.types";
import { ThreeJsParams } from "visual/display/hooks/use-three-js/types";

export type SceneProperties = {
  position: string;
  viewWidth: string;
  viewHeight: string;
  backgroundColor: string;
  backgroundUrl: string;
  background?: Texture;
  videoBackground?: string;
  fixed?: boolean;
};

export type SceneData = {
  threeJs: ThreeJsParams;
  meshes: Object3D[];
  sceneComponents: Object3D[];
  lights: SceneLight[];
  sceneProperties: SceneProperties;
};
