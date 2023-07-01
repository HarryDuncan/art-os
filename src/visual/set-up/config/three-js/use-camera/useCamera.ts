import { useMemo } from "react";
import { OrthographicCamera, PerspectiveCamera } from "three";
import { CAMERA_TYPES, CameraConfig } from "./camera.types";
import { getPosition } from "visual/set-up/config/utils/position";
import { useWindowState } from "visual/compat/window-state/windowStateProvider";
import { DEFAULT_ORTHOGRAPHIC, DEFAULT_PERSPECTIVE } from "./camera.consts";

export const useCamera = (config?: CameraConfig) => {
  const {
    state: {
      windowSize: { width, height },
    },
  } = useWindowState();
  const aspect = width / height;
  return useMemo(() => {
    const camera = getCamera(aspect, config);
    const { x, y, z } = getPosition(config?.position ?? {});
    camera.position.set(x, y, z);
    return camera;
  }, [config]);
};

const getCamera = (aspect: number, config?: CameraConfig) => {
  switch (config?.cameraType) {
    case CAMERA_TYPES.ORTHOGRAPHIC_CAMERA: {
      const { orthographicCameraConfig = DEFAULT_ORTHOGRAPHIC } = config || {};
      const { frustumSize } = orthographicCameraConfig;
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
      const { perspectiveCameraConfig = DEFAULT_PERSPECTIVE } = config || {};
      const { fov, near, far } = perspectiveCameraConfig;
      const camera = new PerspectiveCamera(fov, aspect, near, far);
      return camera;
    }
  }
};
