export enum CameraType {
  PERSPECTIVE_CAMERA = "perspectiveCamera",
  ORTHOGRAPHIC_CAMERA = "orthographicCamera",
}
export interface CameraParams {
  cameraType: CameraType;
  position: {
    x: number;
    y: number;
    z: number;
  };
  perspectiveCameraProps: PerspectiveCameraProps;
  orthographicCameraProps: OrthographicCameraProps;
}
export interface OrthographicCameraProps {
  frustumSize: number;
}
export interface PerspectiveCameraProps {
  fov: number;
  aspect: number;
  near: number;
  far: number;
}
