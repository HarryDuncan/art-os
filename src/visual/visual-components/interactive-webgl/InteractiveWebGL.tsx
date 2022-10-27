import React, { useCallback, useEffect } from "react";
import PostProcessor from "visual/components/post-processor/PostProcessor";
import { InteractiveNode } from "visual/components/interactive-node/InteractiveNode";
import { useSetUpScene } from "visual/hooks/useSetUpScene";
import { InteractiveObjectParams } from "./types";
import { RootContainer } from "../../components/root-container";
import { Layers } from "visual/components/layers/Layers";
import { useSceneData } from "./useSceneData";
import { useMeshes } from "visual/hooks/useMeshes";

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

  const sceneData = useSceneData(
    initializedAssets,
    areAssetsInitialized,
    materialParams
  );

  const meshes = useMeshes(sceneData?.geometries, interactionEvents);

  const initializeMesh = useCallback(() => {
    if (meshes) {
      meshes.forEach((mesh) => scene.add(mesh));
      postProcessor.current = new PostProcessor({
        renderer,
        scene,
        camera,
      });
      update();
    }
  }, [postProcessor, renderer, scene, camera, meshes, update]);

  useEffect(() => {
    initializeMesh();
  }, [initializeMesh]);

  return (
    <>
      <Layers />
      <InteractiveNode interactions={interactionEvents} />
      <RootContainer containerRef={container} />
    </>
  );
}
