import React, { useEffect, useCallback } from "react";
import { useSetUpScene } from "visual/hooks/useSetUpScene";
import { useInteractiveMaterial } from "visual/hooks/use-interactive-material/useInteractiveMaterial";
import { InteractiveShaderTypes } from "visual/components/interactive-shaders/types";
import PostProcessor from "visual/components/post-processor/PostProcessor";
import { useInteractiveSceneOld } from "visual/hooks/use-interactive-scene/useInteractiveSceneOld";
import { useAttractionMorphingData } from "./useAttractionMorphingData";
import { RootContainer } from "../../components/root-container";
import { InteractiveNode } from "visual/components/interactive-node/InteractiveNode";

// interface ImageDistortionProps {
//   params: ImageDistortionParams;
// }

export const AttractionMorphing = ({ params }: any) => {
  const {
    threeJsParams,
    interactionEvents,
    assets,
    materialFunctions,
    materialParams,
    sceneFunctions,
    visualComponentConfig,
  } = params;
  const {
    areAssetsInitialized,
    initializedAssets,
    update,
    postProcessor,
    renderer,
    camera,
    container,
  } = useSetUpScene(threeJsParams, assets);

  const { geometry, uniforms, shaders } = useAttractionMorphingData(
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

  const scene = useInteractiveSceneOld([], sceneFunctions, {});
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
      <RootContainer containerRef={container} config={visualComponentConfig} />
    </>
  );
};
