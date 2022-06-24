import { RendererParams } from "./renderer/use-renderer/types";
import { CameraParams } from "./use-camera/types";

export type ThreeJsParams = {
  camera?: CameraParams;
  renderer?: RendererParams;
};
