import React, { useCallback, useEffect } from "react";
import { useInteractiveMaterial } from "visual/hooks/use-interactive-material/useInteractiveMaterial";
import PostProcessor from "visual/components/post-processor/PostProcessor";
import { useSetUpScene } from "visual/hooks/useSetUpScene";
import { PostProcessorPasses } from "visual/components/post-processor/types";
import { useFormatParams } from "./useFormatParams";
import { RootContainer } from "../../components/root-container";
import { TextTrailParams } from "./types";
import { InteractiveNode } from "visual/components/interactive-node/InteractiveNode";

interface TextTrailProps {
  params: TextTrailParams;
}

export function TextTrail({ params }: TextTrailProps) {
  const {
    threeJsParams,
    interactionEvents,
    assets,
    materialParams,
    materialFunctions,
  } = params;

  const {
    areAssetsInitialized,
    initializedAssets,
    scene,
    postProcessor,
    renderer,
    camera,
    update,
    container,
  } = useSetUpScene(threeJsParams, assets);

  const { geometry, uniforms, shaders } = useFormatParams(
    initializedAssets,
    areAssetsInitialized,
    materialParams
  );

  const interactiveMesh = useInteractiveMaterial(
    interactionEvents,
    materialFunctions,
    geometry,
    uniforms,
    shaders
  );

  const initializeMesh = useCallback(() => {
    if (interactiveMesh) {
      scene.add(interactiveMesh);
      postProcessor.current = new PostProcessor({
        renderer,
        scene,
        camera,
        passes: [PostProcessorPasses.BLOOM],
      });
      update();
    }
  }, [postProcessor, renderer, scene, camera, interactiveMesh, update]);

  useEffect(() => {
    initializeMesh();
  }, [initializeMesh]);

  return (
    <>
      <InteractiveNode interactions={interactionEvents} />
      <RootContainer containerRef={container} />
    </>
  );
}
