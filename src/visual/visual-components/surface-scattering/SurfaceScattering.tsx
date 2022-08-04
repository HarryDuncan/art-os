import { useSetUpScene } from "visual/hooks/useSetUpScene";
import React, { useCallback, useEffect } from "react";
import { Scene } from "three";
import { RootContainer } from "visual/components/root-container";
import { useInteractions } from "visual/hooks/use-interactions/useInteractions";
import { useInteractiveScene } from "visual/hooks/use-interactive-scene/useInteractiveScene";
import PostProcessor from "visual/components/post-processor/PostProcessor";
import { StaticBackground } from "visual/components/static-background/StaticBackground";
import { PostProcessorPasses } from "visual/components/post-processor/types";
import { useFormatSurfaceScattering } from "./useFormatSurfaceScattering";

export function SurfaceScattering({ params }: any) {
  const {
    threeJsParams,
    interactionEvents,
    assets,

    materialFunctions,
  } = params;
  const {
    areAssetsInitialized,
    initializedAssets,
    postProcessor,
    renderer,
    camera,
    update,
    container,
  } = useSetUpScene(threeJsParams, assets);

  const { group, materialParams } = useFormatSurfaceScattering(
    initializedAssets,
    areAssetsInitialized
  );
  const { interactiveNode } = useInteractions(interactionEvents);
  const interactiveScene = useInteractiveScene(
    group,
    interactionEvents,
    materialFunctions,
    materialParams
  );

  const initializeScene = useCallback(() => {
    if (!interactiveScene) return;
    postProcessor.current = new PostProcessor({
      renderer,
      scene: interactiveScene as Scene,
      camera,
      passes: [PostProcessorPasses.BLOOM],
    });
    renderer.render(interactiveScene as Scene, camera);
    update();
  }, [postProcessor, renderer, interactiveScene, camera, update]);

  useEffect(() => {
    initializeScene();
  }, [initializeScene]);

  return (
    <>
      {interactiveNode}
      <RootContainer containerRef={container} />
      <StaticBackground />
    </>
  );
}
