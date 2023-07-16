import { useMemo } from "react";
import { Camera, MOUSE, WebGLRenderer } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer";

export const useOrbitControls = (
  camera: Camera,
  renderer: WebGLRenderer | CSS3DRenderer,
  hasOrbitControls = false
) => {
  return useMemo(() => {
    if (!camera || !renderer || !renderer.domElement || !hasOrbitControls)
      return null;
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.listenToKeyEvents(window); // optional
    controls.mouseButtons = {
      LEFT: MOUSE.ROTATE,
      MIDDLE: MOUSE.DOLLY,
      RIGHT: MOUSE.PAN,
    };
    controls.screenSpacePanning = false;
    return controls;
  }, [renderer, camera, hasOrbitControls]);
};
