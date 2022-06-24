import React, { useCallback, useEffect, FC } from "react";
import { RootContainer } from "../../components/root-container";
import { useInteractions } from "visual/hooks/use-interactions/useInteractions";
import { InteractionEventObject } from "visual/hooks/use-interactions/types";
import { useInteractiveMaterial } from "visual/hooks/use-interactive-material/useInteractiveMaterial";
import { useThreeJs } from "visual/hooks/use-three-js/useThreeJs";
import { ThreeJsParams } from "visual/hooks/use-three-js/types";
import { Asset } from "visual/hooks/use-assets/types";
import { useAssets } from "visual/hooks/use-assets/useAssets";
import PostProcessing from "visual/components/post-processing/PostProcessing";
import { useThread } from "visual/hooks/use-thread/useThread";
import {
  InteractiveMaterialFunctions,
  InteractiveParam,
} from "visual/components/interactive-material/types";
import { VisualComponentProps } from "../types";

interface InteractiveObjectParams {
  threeJsParams: ThreeJsParams;
  interactions: InteractionEventObject[];
  assets: Asset[];
  materialParams: InteractiveParam;
  materialFunctions: InteractiveMaterialFunctions;
}

export const InteractiveObject: FC<VisualComponentProps> = ({
  params,
}: {
  params: InteractiveObjectParams;
}) => {
  const {
    threeJsParams,
    interactions,
    assets,
    materialParams,
    materialFunctions,
  } = params;

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
  const { update } = useThread(postProcessor, currentFrameRef, clock);
  const { interactiveNode } = useInteractions(interactions);
  const interactiveMesh = useInteractiveMaterial(
    materialParams,
    interactions,
    areAssetsInitialized,
    initializedAssets,
    materialFunctions
  );

  const initializeMesh = useCallback(() => {
    if (interactiveMesh) {
      scene.add(interactiveMesh);
      setTimeout(() => {
        postProcessor.current = new PostProcessing({ renderer, scene, camera });
        update();
      }, 500);
    }
  }, [postProcessor, renderer, scene, camera, interactiveMesh, update]);

  useEffect(() => {
    initializeMesh();
  }, [initializeMesh]);

  return (
    <>
      {interactiveNode}
      <RootContainer containerRef={container} />
    </>
  );
};
