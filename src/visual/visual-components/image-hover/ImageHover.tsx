import { useSetUpScene } from "visual/hooks/useSetUpScene";
import React, { useCallback, useEffect } from "react";
import { RootContainer } from "visual/components/root-container";
import { StaticBackground } from "visual/components/static-background/StaticBackground";
import { useInteractiveMaterial } from "visual/hooks/use-interactive-material/useInteractiveMaterial";
import { InteractiveShaderTypes } from "visual/components/interactive-shaders/types";
import PostProcessor from "visual/components/post-processor/PostProcessor";
import { useFormatImageHover } from "./useFormatImageHover";
import { InteractiveNode } from "visual/components/interactive-node/InteractiveNode";

export function ImageHover({ params }: any) {
  const {
    threeJsParams,
    interactionEvents,
    assets,
    materialFunctions,
    materialParams,
  } = params;
  const {
    areAssetsInitialized,
    initializedAssets,
    update,
    scene,
    postProcessor,
    renderer,
    camera,
    container,
  } = useSetUpScene(threeJsParams, assets);

  const { geometry, uniforms, shaders } = useFormatImageHover(
    initializedAssets,
    areAssetsInitialized,
    materialParams
  );

  const interactiveMesh = useInteractiveMaterial(
    interactionEvents,
    materialFunctions,
    geometry,
    uniforms,
    shaders,
    InteractiveShaderTypes.SHADER
  );
  const initializeMesh = useCallback(() => {
    if (interactiveMesh) {
      scene.add(interactiveMesh);
      postProcessor.current = new PostProcessor({
        renderer,
        scene,
        camera,
        passes: [],
      });
      update();
    }
  }, [scene, interactiveMesh, update, postProcessor, renderer, camera]);

  useEffect(() => {
    initializeMesh();
  }, [initializeMesh]);

  return (
    <>
      <InteractiveNode interactions={interactionEvents} />
      <RootContainer containerRef={container} />
      <StaticBackground />
    </>
  );
}
