import { ThreeJsParams } from "../use-three-js/types";
import { useThreeJs } from "../use-three-js/useThreeJs";

export const useSetUpScene = (threeJsParams: ThreeJsParams) => {
  const {
    container,
    renderer,
    scene,
    camera,
    currentFrameRef,
    postProcessor,
    clock,
    orbitControls,
  } = useThreeJs(threeJsParams);

  return {
    container,
    renderer,
    scene,
    camera,
    postProcessor,
    currentFrameRef,
    clock,
    orbitControls,
  };
};
