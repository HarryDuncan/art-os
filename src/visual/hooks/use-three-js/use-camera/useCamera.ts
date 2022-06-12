import { useMemo } from "react";
import { PerspectiveCamera } from "three";
import { CameraParams } from "./types";

const defaultParams: CameraParams = {
  position: {
    x: 0,
    y: 0,
    z: 0,
  },
};

export const useCamera = (cameraParams: CameraParams = defaultParams) =>
  useMemo(() => {
    const {
      position: { x, y, z },
    } = cameraParams;
    const camera = new PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight > 1
        ? window.innerWidth / window.innerHeight
        : 1.0,
      1,
      10000
    );
    camera.position.set(x, y, z);

    return camera;
  }, [cameraParams]);
