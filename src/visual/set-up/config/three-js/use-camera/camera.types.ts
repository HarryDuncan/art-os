import { Position3d } from "visual/display/helpers/three-dimension-space/position/position.types";

export const CAMERA_TYPES = {
  PERSPECTIVE_CAMERA: "perspectiveCamera",
  ORTHOGRAPHIC_CAMERA: "orthographicCamera",
};
export type CameraType = keyof typeof CAMERA_TYPES;

export interface CameraConfig {
  cameraType: CameraType;
  position: Partial<Position3d>;
  perspectiveCameraConfig?: PerspectiveCameraConfig;
  orthographicCameraConfig?: OrthographicCameraConfig;
}

export interface OrthographicCameraConfig {
  frustumSize: number;
}
export interface PerspectiveCameraConfig {
  fov: number;
  aspect: number;
  near: number;
  far: number;
}
