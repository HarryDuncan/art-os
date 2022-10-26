import React, { useEffect, useCallback } from "react";
import { useSetUpScene } from "visual/hooks/useSetUpScene";
import { useInteractions } from "visual/hooks/use-interactions/useInteractions";
import { useInteractiveMaterial } from "visual/hooks/use-interactive-material/useInteractiveMaterial";
import { InteractiveShaderTypes } from "visual/components/interactive-shaders/types";
import PostProcessor from "visual/components/post-processor/PostProcessor";
import { useInteractiveSceneOld } from "visual/hooks/use-interactive-scene/useInteractiveSceneOld";
import { useAttractionMorphingData } from "./useAttractionMorphingData";
import { RootContainer } from "../../components/root-container";

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

  const { interactiveNode } = useInteractions(interactionEvents);
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
      {interactiveNode}
      <RootContainer containerRef={container} config={visualComponentConfig} />
    </>
  );
};
