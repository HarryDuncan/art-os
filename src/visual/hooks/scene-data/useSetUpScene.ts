import { useEffect } from "react";
import { Asset } from "../use-assets/types";
import { useAssets } from "../use-assets/useAssets";
import { useThreadWithPostProcessor } from "../use-thread";
import { ThreeJsParams } from "../use-three-js/types";
import { useThreeJs } from "../use-three-js/useThreeJs";

export const useSetUpScene = (
  threeJsParams: ThreeJsParams,
  assets: Asset[] = []
) => {
  const {
    container,
    renderer,
    scene,
    camera,
    currentFrameRef,
    postProcessor,
    clock,
  } = useThreeJs(threeJsParams);
  const { initializedAssets, areAssetsInitialized } = useAssets(assets);
  const { update, pause } = useThreadWithPostProcessor(
    postProcessor,
    currentFrameRef,
    clock
  );

  useEffect(() => () => pause(), [pause]);

  return {
    container,
    renderer,
    scene,
    camera,
    postProcessor,
    initializedAssets,
    areAssetsInitialized,
    update,
    pause,
    clock,
  };
};
