export interface CameraParams {
  position: {
    x: number;
    y: number;
    z: number;
  };
  fov: number;
  aspect: number;
  near: number;
  far: number;
}
