import { sRGBEncoding } from "three";
import { RendererTypes } from "visual/hooks/use-three-js/renderer/types";
import { defaultCameraParams } from "visual/hooks/use-three-js/use-camera/useCamera";

export const DEFAULT_THREE_JS = {
  camera: {
    ...defaultCameraParams,
    position: { x: 0, y: 0, z: 0 },
  },
  renderer: {
    rendererType: RendererTypes.WEBGL,
    outputEncoding: sRGBEncoding,
  },
};
