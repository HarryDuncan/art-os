import React, { useCallback, useEffect } from "react";
import { RootContainer } from "../../components/root-container";
import { useInteractions } from "visual/hooks/use-interactions/useInteractions";
import { useThreeJs } from "visual/hooks/use-three-js/useThreeJs";
import { useAssets } from "visual/hooks/use-assets/useAssets";
import PostProcessing from "visual/components/post-processing/PostProcessing";
import { useThread } from "visual/hooks/use-thread/useThread";
import { InteractiveParticlesParams } from "./types";
import { useInteractiveParticles } from "visual/hooks/use-interactive-particles/useInteractiveParticles";

interface InteractiveObjectProps {
  params: InteractiveParticlesParams;
}

export const InteractiveParticles = ({ params }: InteractiveObjectProps) => {
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
  const interactiveParticleMesh = useInteractiveParticles(
    materialParams,
    interactionEvents,
    areAssetsInitialized,
    initializedAssets,
    materialFunctions
  );

  const initializeMesh = useCallback(() => {
    if (interactiveParticleMesh) {
      scene.add(interactiveParticleMesh);
      postProcessor.current = new PostProcessing({
        renderer,
        scene,
        camera,
      });
      renderer.render(scene, camera);
      update();
    }
  }, [postProcessor, renderer, scene, camera, interactiveParticleMesh, update]);

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
