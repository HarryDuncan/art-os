import { ThreeJsParams } from "../use-three-js/types";
import { useThreeJs } from "../use-three-js/useThreeJs";

export const useSetUpScene = (threeJsParams: ThreeJsParams) => {
  const {
    container,
    renderer,
    scene,
    camera,
    currentFrameRef,
    clock,
    orbitControls,
  } = useThreeJs(threeJsParams);

  return {
    container,
    renderer,
    scene,
    camera,
    currentFrameRef,
    clock,
    orbitControls,
  };
};
