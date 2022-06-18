import React, { useCallback, useEffect } from "react";
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

interface InteractiveObjectProps {
  threeJsParams: ThreeJsParams;
  interactionEvents: InteractionEventObject[];
  assets: Asset[];
  materialParams: any;
}
export const InteractiveObject = ({
  threeJsParams,
  interactionEvents,
  assets,
  materialParams,
}: InteractiveObjectProps) => {
  const { initializedAssets, areAssetsInitialized } = useAssets(assets);

  // Set up ref, scene, and renderer, camera
  const {
    container,
    renderer,
    scene,
    camera,
    currentFrameRef,
    postProcessor,
    clock,
  } = useThreeJs(threeJsParams);

  // THREAD CONTROL
  const { update } = useThread(postProcessor, currentFrameRef, clock);

  // Interactive
  const { interactiveNode } = useInteractions(interactionEvents);
  const interactiveMesh = useInteractiveMaterial(
    materialParams,
    interactionEvents,
    areAssetsInitialized,
    initializedAssets
  );

  const initializeMesh = useCallback(() => {
    if (interactiveMesh) {
      scene.add(interactiveMesh);
      postProcessor.current = new PostProcessing({ renderer, scene, camera });
      update();
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
