import { useSetUpScene } from "visual/hooks/useSetUpScene";
import React, { useCallback, useEffect } from "react";
import { Scene } from "three";
import { RootContainer } from "visual/components/root-container";
import { useInteractiveSceneOld } from "visual/hooks/use-interactive-scene/useInteractiveSceneOld";
import PostProcessor from "visual/components/post-processor/PostProcessor";
import { StaticBackground } from "visual/components/static-background/StaticBackground";
import { PostProcessorPasses } from "visual/components/post-processor/types";
import { InteractiveNode } from "visual/components/interactive-node/InteractiveNode";
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

  const { group, sceneParams } = useFormatSurfaceScattering(
    initializedAssets,
    areAssetsInitialized
  );
  const interactiveScene = useInteractiveSceneOld(
    interactionEvents,
    materialFunctions,
    sceneParams
  );

  const initializeScene = useCallback(() => {
    if (!interactiveScene || !group) return;
    interactiveScene.add(group);
    postProcessor.current = new PostProcessor({
      renderer,
      scene: interactiveScene as Scene,
      camera,
      passes: [PostProcessorPasses.BLOOM],
    });
    renderer.render(interactiveScene as Scene, camera);
    update();
  }, [postProcessor, renderer, interactiveScene, camera, update, group]);

  useEffect(() => {
    initializeScene();
  }, [initializeScene]);

  return (
    <>
      <InteractiveNode interactions={interactionEvents} />
      <RootContainer containerRef={container} />
      <StaticBackground />
    </>
  );
}
