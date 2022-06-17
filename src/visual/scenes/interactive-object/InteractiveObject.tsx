import React, { useEffect } from "react";
import { RootContainer } from "../../components/root-container";
import { ev } from "visual/hooks/use-events/useEvents";
import { useInitializeNode } from "visual/hooks/use-initialize-node/useInitializeNode";
import { useInteractions } from "visual/hooks/use-interactions/useInteractions";
import { InteractionEventObject } from "visual/hooks/use-interactions/types";
import { useInteractiveMaterial } from "visual/hooks/use-interactive-material/useInteractiveMaterial";
import { useThreeJs } from "visual/hooks/use-three-js/useThreeJs";
import { ThreeJsParams } from "visual/hooks/use-three-js/types";
import { Asset } from "visual/hooks/use-assets/types";
import { useInitializeAssets } from "visual/hooks/use-assets/useAssets";

interface InteractiveObjectProps {
  threeJsParams: ThreeJsParams;
  interactionEvents: InteractionEventObject[];
  assets: Asset[];
  materialParams: any;
}
export const InteractiveObject = ({
  threeJsParams,
  interactionEvents,
  assets,
  materialParams,
}: InteractiveObjectProps) => {
  // Assets
  const initializeAssets = useInitializeAssets(assets);
  useEffect(() => {
    async function getAssets() {
      const loadedAssets = await initializeAssets();
      console.log(loadedAssets);
    }

    getAssets();
  }, [assets]);
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
  // const update = () => {
  //   ev("scene:update");

  //   postProcessor.current?.render(clock.getDelta());
  //   // renderer.render(scene, camera);
  //   if (controller.isRunningThread) {
  //     currentFrameRef.current = requestAnimationFrame(update);
  //   }
  // };
  // const pause = () => {
  //   cancelAnimationFrame(currentFrameRef.current);
  // };
  // useControlThread(controller, update, pause);

  // Interactive
  const { interactiveNode } = useInteractions(interactionEvents);
  const createInteractiveMesh = useInteractiveMaterial(materialParams);

  const initializeNode = () => {};

  useInitializeNode(container, renderer, initializeNode);

  return (
    <>
      {interactiveNode}
      <RootContainer containerRef={container} />
    </>
  );
};
