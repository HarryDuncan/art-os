import { useMemo } from "react";
import { MOUSE } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export const useOrbitControls = (
  camera,
  renderer,
  hasOrbitControls = false
) => {
  return useMemo(() => {
    if (!camera || !renderer || !renderer.domElement || !hasOrbitControls) return null;
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.listenToKeyEvents(window); // optional
    controls.mouseButtons = {
      LEFT: MOUSE.ROTATE,
      MIDDLE: MOUSE.DOLLY,
      RIGHT: MOUSE.PAN,
    };
    controls.screenSpacePanning = false;
    return controls;
  }, [renderer, camera]);
};
