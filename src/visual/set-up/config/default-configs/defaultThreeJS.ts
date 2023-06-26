import { sRGBEncoding } from "three";
import { RENDERER_TYPES } from "visual/display/hooks/use-three-js/renderer/rendererConstants";
import {
  CAMERA_TYPES,
  CameraType,
} from "visual/display/hooks/use-three-js/use-camera/types";

export const DEFAULT_THREE_JS = {
  camera: {
    cameraType: CAMERA_TYPES.PERSPECTIVE_CAMERA as CameraType,
    position: {
      x: 0,
      y: 0,
      z: 2,
    },
    perspectiveCameraProps: {
      fov: 45,
      aspect: window.innerWidth / window.innerHeight,
      near: 1,
      far: 1000,
    },
    orthographicCameraProps: {
      frustumSize: 1,
    },
  },
  renderer: {
    rendererType: RENDERER_TYPES.WEBGL,
    outputEncoding: sRGBEncoding,
  },
};
