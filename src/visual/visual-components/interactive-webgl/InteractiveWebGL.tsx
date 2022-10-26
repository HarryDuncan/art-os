import React, { useCallback, useEffect } from "react";
import { useInteractiveMaterial } from "visual/hooks/use-interactive-material/useInteractiveMaterial";
import PostProcessor from "visual/components/post-processor/PostProcessor";
import { InteractiveNode } from "visual/components/interactive-node/InteractiveNode";
import { useSetUpScene } from "visual/hooks/useSetUpScene";
import { useEventsWithShader } from "visual/hooks/use-events/useEvents";
import { InteractiveShaderTypes } from "visual/components/interactive-shaders/types";
import { InteractiveObjectParams } from "./types";
import { useFormatWebGL } from "./useFormatWebGL";
import { RootContainer } from "../../components/root-container";

interface InteractiveObjectProps {
  params: InteractiveObjectParams;
}

export function InteractiveWebGL({ params }: InteractiveObjectProps) {
  const {
    threeJsParams,
    interactionEvents,
    assets,
    materialParams,
    materialFunctions,
    events,
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

  const interactiveMesh = useInteractiveMaterial(
    interactionEvents,
    materialFunctions,
    geometry,
    uniforms,
    shaders,
    InteractiveShaderTypes.SHADER
  );

  useEventsWithShader(interactiveMesh, events);

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
      <InteractiveNode interactions={interactionEvents} />
      <RootContainer containerRef={container} />
    </>
  );
}
