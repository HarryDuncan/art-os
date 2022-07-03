import { useMemo } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export const useTrackballControls = (camera, renderer, update) => {
  return useMemo(() => {
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 500;
    controls.maxDistance = 6000;
    controls.addEventListener("change", update);
    return controls;
  }, [camera, renderer, update]);
};
