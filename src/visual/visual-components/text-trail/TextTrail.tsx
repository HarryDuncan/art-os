import React, { useCallback, useEffect } from "react";
import { RootContainer } from "../../components/root-container";
import { useInteractions } from "visual/hooks/use-interactions/useInteractions";
import { useInteractiveMaterial } from "visual/hooks/use-interactive-material/useInteractiveMaterial";
import PostProcessor from "visual/components/post-processor/PostProcessor";
import { useSetUpScene } from "visual/hooks/useSetUpScene";
import { useFormatParams } from "./useFormatParams";
import { PostProcessorPasses } from "visual/components/post-processor/types";
import { TextTrailParams } from "./types";

interface TextTrailProps {
  params: TextTrailParams;
}

export const TextTrail = ({ params }: TextTrailProps) => {
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

  const { interactiveNode } = useInteractions(interactionEvents);
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
      {interactiveNode}
      <RootContainer containerRef={container} />
    </>
  );
};
