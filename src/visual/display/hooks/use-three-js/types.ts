import { OrthographicCamera, PerspectiveCamera } from "three";
import { RendererParams } from "./renderer/types";

export type ThreeJsParams = {
  camera: PerspectiveCamera | OrthographicCamera;
  renderer?: RendererParams;
  controls?: {
    hasOrbitControls: boolean;
  };
};
