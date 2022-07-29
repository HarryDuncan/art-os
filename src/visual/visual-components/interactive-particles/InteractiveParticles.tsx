import React, { useCallback, useEffect } from "react";
import { useInteractions } from "visual/hooks/use-interactions/useInteractions";
import PostProcessor from "visual/components/post-processor/PostProcessor";
import { StaticBackgroundContainer } from "visual/components/static-background/StaticBackground.styles";
import { useSetUpScene } from "visual/hooks/useSetUpScene";
import { useInteractiveMaterial } from "visual/hooks/use-interactive-material/useInteractiveMaterial";
import { InteractiveParticlesParams } from "./types";
import { RootContainer } from "../../components/root-container";
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
    materialParams,
    renderer
  );

  const { interactiveNode } = useInteractions(interactionEvents);
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
      {interactiveNode}
      <RootContainer containerRef={container} />
      <StaticBackgroundContainer />
    </>
  );
}
