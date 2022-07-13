import React, { useCallback, useEffect } from "react";
import { RootContainer } from "../../components/root-container";
import { useInteractions } from "visual/hooks/use-interactions/useInteractions";
import { useInteractiveMaterial } from "visual/hooks/use-interactive-material/useInteractiveMaterial";
import PostProcessing from "visual/components/post-processing/PostProcessing";
import { InteractiveObjectParams } from "./types";
import { useSetUpScene } from "visual/hooks/useSetUpScene";
import { useFormatWebGL } from "./useFormatWebGL";
import { InteractiveShaderTypes } from "visual/components/interactive-shaders/types";

interface InteractiveObjectProps {
  params: InteractiveObjectParams;
}

export const InteractiveWebGL = ({ params }: InteractiveObjectProps) => {
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

  const { uniforms, shaders, geometry } = useFormatWebGL(
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
  const initializeMesh = useCallback(() => {
    if (interactiveMesh) {
      scene.add(interactiveMesh);
      postProcessor.current = new PostProcessing({
        renderer,
        scene,
        camera,
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
