import React, { useCallback, useEffect } from 'react';
import { useInteractions } from 'visual/hooks/use-interactions/useInteractions';
import { useInteractiveMaterial } from 'visual/hooks/use-interactive-material/useInteractiveMaterial';
import { InteractiveShaderTypes } from 'visual/components/interactive-shaders/types';
import { useThreeJs } from 'visual/hooks/use-three-js/useThreeJs';
import { useAssets } from 'visual/hooks/use-assets/useAssets';
import { useThread } from 'visual/hooks/use-thread';
import { useFormatWebGL } from './useFormatMaterialParams';
import { ImageDistortionParams } from './types';
import { RootContainer } from '../../components/root-container';

interface ImageDistortionProps {
  params: ImageDistortionParams;
}

export function ImageDistortion({ params }: ImageDistortionProps) {
  const {
    threeJsParams,
    interactionEvents,
    assets,
    materialParams,
    materialFunctions,
  } = params;

  const {
    scene, renderer, camera, currentFrameRef, container,
  } = useThreeJs(
    threeJsParams,
  );
  const { areAssetsInitialized, initializedAssets } = useAssets(assets);
  const { update } = useThread(renderer, currentFrameRef, scene, camera);

  const { uniforms, shaders, geometry } = useFormatWebGL(
    initializedAssets,
    areAssetsInitialized,
    materialParams,
  );
  const { interactiveNode } = useInteractions(interactionEvents);
  const interactiveMesh = useInteractiveMaterial(
    interactionEvents,
    materialFunctions,
    geometry,
    uniforms,
    shaders,
    InteractiveShaderTypes.SHADER,
  );
  const initializeMesh = useCallback(() => {
    if (interactiveMesh) {
      scene.add(interactiveMesh);
      update();
    }
  }, [scene, interactiveMesh, update]);

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
