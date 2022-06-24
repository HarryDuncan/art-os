import React, { useCallback, useEffect } from "react";
import { RootContainer } from "../../components/root-container";
import { useInteractions } from "visual/hooks/use-interactions/useInteractions";
import { useInteractiveMaterial } from "visual/hooks/use-interactive-material/useInteractiveMaterial";
import { useThreeJs } from "visual/hooks/use-three-js/useThreeJs";
import { useAssets } from "visual/hooks/use-assets/useAssets";
import PostProcessing from "visual/components/post-processing/PostProcessing";
import { useThread } from "visual/hooks/use-thread/useThread";
import { InteractiveObjectParams } from "./types";

interface InteractiveObjectProps {
  params: InteractiveObjectParams;
}

export const InteractiveObject = ({ params }: InteractiveObjectProps) => {
  const {
    threeJsParams,
    interactionEvents,
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
  const { update, pause } = useThread(postProcessor, currentFrameRef, clock);
  const { interactiveNode } = useInteractions(interactionEvents);
  const interactiveMesh = useInteractiveMaterial(
    materialParams,
    interactionEvents,
    areAssetsInitialized,
    initializedAssets,
    materialFunctions
  );
  const initializeMesh = useCallback(() => {
    if (interactiveMesh) {
      scene.add(interactiveMesh);
      postProcessor.current = new PostProcessing({
        renderer,
        scene,
        camera,
        passes: ["bloom"],
      });
      update();
    }
  }, [postProcessor, renderer, scene, camera, interactiveMesh, update]);

  useEffect(() => {
    initializeMesh();
  }, [initializeMesh]);

  useEffect(() => {
    return () => pause();
  }, [pause]);

  return (
    <>
      {interactiveNode}
      <RootContainer containerRef={container} />
    </>
  );
};
