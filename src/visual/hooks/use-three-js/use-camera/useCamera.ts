import { useMemo } from "react";
import { PerspectiveCamera } from "three";
import { CameraParams } from "./types";

const defaultParams: CameraParams = {
  position: {
    x: 0,
    y: 0,
    z: 0,
  },
  fov: 45,
  aspect: window.innerWidth / window.innerHeight,
  near: 1,
  far: 2000,
};

export const useCamera = (cameraParams: CameraParams = defaultParams) =>
  useMemo(() => {
    const {
      position: { x, y, z },
      fov,
      aspect,
      near,
      far,
    } = cameraParams;
    const camera = new PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(x, y, z);

    return camera;
  }, [cameraParams]);
