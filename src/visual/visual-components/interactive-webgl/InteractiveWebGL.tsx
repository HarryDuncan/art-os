import React, { useCallback, useEffect } from "react";
import { useInteractions } from "visual/hooks/use-interactions/useInteractions";
import { useInteractiveMaterial } from "visual/hooks/use-interactive-material/useInteractiveMaterial";
import PostProcessor from "visual/components/post-processor/PostProcessor";
import { useSetUpScene } from "visual/hooks/useSetUpScene";
import { InteractiveShaderTypes } from "visual/components/interactive-shaders/types";
import { InteractiveObjectParams } from "./types";
import { useFormatWebGL } from "./useFormatWebGL";
import { RootContainer } from "../../components/root-container";

interface InteractiveObjectProps {
  params: InteractiveObjectParams;
}

export function InteractiveWebGL({ params }: InteractiveObjectProps) {
  console.log(params);
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
      postProcessor.current = new PostProcessor({
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
}
