import React, { useEffect } from "react";
import { RootContainer } from "../../components/root-container";
import { ev } from "visual/hooks/use-events/useEvents";
import { useInitializeNode } from "visual/hooks/use-initialize-node/useInitializeNode";
import { useController } from "visual/hooks/use-controller/useController";
import { useControlThread } from "visual/hooks/use-control-thread/use-control-thread";
import PostProcessing from "../../components/post-processing/PostProcessing";

import { useInteractions } from "visual/hooks/use-interactions/useInteractions";
import { InteractionEventObject } from "visual/hooks/use-interactions/types";
import loadTexture from "visual/helpers/TextureLoader";
import { loadObjModel } from "visual/helpers/ModelLoader";
import { useInteractiveMaterial } from "visual/hooks/use-interactive-material/useInteractiveMaterial";
import { vertex } from "./vertex";
import { fragment } from "./fragment";
import ParticleSystem from "../../components/particle-system/ParticleSystem";
import { useThreeJs } from "visual/hooks/use-three-js/useThreeJs";
import { ThreeJsParams } from "visual/hooks/use-three-js/types";
import { Asset } from "visual/hooks/use-assets/types";
import { useAssets } from "visual/hooks/use-assets/useAssets";

export interface IMagicObjectStore {
  model?: any;
  texture?: any;
}

interface InteractiveObjectProps {
  threeJsParams: ThreeJsParams;
  interactionEvents: InteractionEventObject[];
  assets: Asset[];
}
export const InteractiveObject = ({
  threeJsParams,
  interactionEvents,
  assets,
}: InteractiveObjectProps) => {
  const {
    controller,
    updateController,
    onSceneInitialized,
    onAssetsInitialized,
    onFrameworkInitialized,
  } = useController({});

  // Set up ref, scene, and renderer, camera
  const {
    container,
    renderer,
    scene,
    camera,
    currentFrameRef,
    postProcessor,
    clock,
  } = useThreeJs(threeJsParams);

  // THREAD CONTROL
  const update = () => {
    ev("scene:update");

    postProcessor.current?.render(clock.getDelta());
    // renderer.render(scene, camera);
    if (controller.isRunningThread) {
      currentFrameRef.current = requestAnimationFrame(update);
    }
  };
  const pause = () => {
    cancelAnimationFrame(currentFrameRef.current);
  };
  useControlThread(controller, update, pause);

  const { interactiveNode } = useInteractions(interactionEvents);
  const createInteractiveMesh = useInteractiveMaterial();

  const store: IMagicObjectStore = {};

  useAssets(assets);

  useEffect(() => {
    initializeAssets();
  }, []);

  const initializeAssets = async () => {
    if (!store.texture) {
      Promise.all([
        loadTexture("../assets//textures/obsidian.jpg"),
        loadObjModel("../assets/models/ZeusBust.obj"),
      ]).then((values) => {
        console.log(values);
        store.texture = values[0];
        //@ts-ignore

        //@ts-ignore
        store.model = values[1].children[0];
        // @ts-ignore
        const geom = store.model.geometry.clone();

        geom.computeBoundingBox();

        const interactiveMesh = createInteractiveMesh(interactionEvents, geom, {
          vertex,
          fragment,
          texture: store.texture,
        });

        const particles = new ParticleSystem(store);
        particles.init();
        scene.add(interactiveMesh, particles);

        postProcessor.current = new PostProcessing({ renderer, scene, camera });
      });
    }
  };

  const initializeScene = () => {
    setTimeout(() => {
      updateController({
        ...controller,
        isSceneInitialized: true,
        isRunningThread: true,
      });
    }, 10000);
  };
  useInitializeNode(container, renderer, initializeScene);

  return (
    <>
      {interactiveNode}
      <RootContainer containerRef={container} />
    </>
  );
};
