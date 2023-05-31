import { useMemo } from "react";
import { OrthographicCamera, PerspectiveCamera } from "three";
import { CameraParams, CameraType, CAMERA_TYPES } from "./types";

export const defaultCameraParams: CameraParams = {
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
};

export const useCamera = (cameraParams: CameraParams = defaultCameraParams) =>
  useMemo(() => {
    const camera = getCamera(cameraParams);
    const {
      position: { x, y, z },
    } = cameraParams;
    camera.position.set(x, y, z);

    return camera;
  }, [cameraParams]);

const getCamera = (cameraParams: CameraParams) => {
  switch (cameraParams.cameraType) {
    case CAMERA_TYPES.ORTHOGRAPHIC_CAMERA: {
      const {
        orthographicCameraProps: { frustumSize },
      } = cameraParams;

      const camera = new OrthographicCamera(
        frustumSize / -2,
        frustumSize / 2,
        frustumSize / 2,
        frustumSize / -2,
        -1000,
        1000
      );
      return camera;
    }
    case CAMERA_TYPES.PERSPECTIVE_CAMERA:
    default: {
      const {
        perspectiveCameraProps: { fov, aspect, near, far },
      } = cameraParams;
      const camera = new PerspectiveCamera(fov, aspect, near, far);
      return camera;
    }
  }
};
