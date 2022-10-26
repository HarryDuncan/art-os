import React, { useCallback, useEffect } from "react";
import { InteractiveNode } from "visual/components/interactive-node/InteractiveNode";
import { useInteractiveMaterial } from "visual/hooks/use-interactive-material/useInteractiveMaterial";
import PostProcessor from "visual/components/post-processor/PostProcessor";
import { useSetUpScene } from "visual/hooks/useSetUpScene";
import { PostProcessorPasses } from "visual/components/post-processor/types";
import { InteractiveObjectParams } from "./types";
import { useFormatMaterialParams } from "./useFormatMaterialParams";
import { RootContainer } from "../../components/root-container";

interface InteractiveObjectProps {
  params: InteractiveObjectParams;
}

export function InteractiveObject({ params }: InteractiveObjectProps) {
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

  const { geometry, uniforms, shaders } = useFormatMaterialParams(
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
