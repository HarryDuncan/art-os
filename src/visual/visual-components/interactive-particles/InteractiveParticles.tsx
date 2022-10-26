import React, { useCallback, useEffect } from "react";
import PostProcessor from "visual/components/post-processor/PostProcessor";
import { RootContainer } from "../../components/root-container";
import { StaticBackgroundContainer } from "visual/components/static-background/StaticBackground.styles";
import { useSetUpScene } from "visual/hooks/useSetUpScene";
import { useInteractiveMaterial } from "visual/hooks/use-interactive-material/useInteractiveMaterial";
import { InteractiveParticlesParams } from "./types";

import { InteractiveNode } from "visual/components/interactive-node/InteractiveNode";
import { useFormatParticleParams } from "./use-format-particle-params/useFormatParticleParams";

interface InteractiveObjectProps {
  params: InteractiveParticlesParams;
}

export function InteractiveParticles({ params }: InteractiveObjectProps) {
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

  const { geometry, uniforms, shaders } = useFormatParticleParams(
    initializedAssets,
    areAssetsInitialized,
    materialParams
  );

  const interactiveParticleMesh = useInteractiveMaterial(
    interactionEvents,
    materialFunctions,
    geometry,
    uniforms,
    shaders
  );

  const initializeMesh = useCallback(() => {
    if (interactiveParticleMesh) {
      scene.add(interactiveParticleMesh);
      postProcessor.current = new PostProcessor({
        renderer,
        scene,
        camera,
      });
      renderer.render(scene, camera);
      update();
    }
  }, [postProcessor, renderer, scene, camera, interactiveParticleMesh, update]);

  useEffect(() => {
    initializeMesh();
  }, [initializeMesh]);

  return (
    <>
      <InteractiveNode interactions={interactionEvents} />
      <RootContainer containerRef={container} />
      <StaticBackgroundContainer />
    </>
  );
}
