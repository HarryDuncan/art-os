import { Camera, Scene } from "three";

export interface IAnimationWidgetScene {
  name: string;
  data: any;
}

export type FunctionBasedScene = {
  name: string;
  scene: null | Scene;
  camera: null | Camera;
  sceneParams: any;
  tag: string;
  sceneLength: number;
  init: any;
  onUpdate: any;
};
