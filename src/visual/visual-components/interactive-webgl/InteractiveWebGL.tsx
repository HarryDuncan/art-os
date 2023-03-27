import React, { useCallback, useEffect } from "react";
import PostProcessor from "visual/components/post-processor/PostProcessor";
import { useSetUpScene } from "visual/hooks/scene-data/useSetUpScene";
import { InteractiveObjectParams } from "./types";
import { RootContainer } from "../../components/container/root-container";
import { useSceneData } from "./useSceneData";
import { useMeshes } from "visual/hooks/scene-data/useMeshes";

interface InteractiveObjectProps {
  params: InteractiveObjectParams;
}

export function InteractiveWebGL({ params }: InteractiveObjectProps) {
  const { threeJsParams, interactions, assets, materialParams } = params;

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

  const meshes = useMeshes(sceneData?.meshConfigs, interactions);

  const initializeMesh = useCallback(() => {
    // is post processor hasn't been set - is null
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

  return <RootContainer containerRef={container} />;
}
