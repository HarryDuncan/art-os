import { OrthographicCamera, PerspectiveCamera } from "three";
import { RendererParams } from "./renderer/types";
import { ControlConfig } from "visual/set-up/config/config.types";

export type ThreeJsParams = {
  camera: PerspectiveCamera | OrthographicCamera;
  renderer?: RendererParams;
  controls?: Partial<ControlConfig>;
};
