import React from "react";
import { Asset, AssetType } from "visual/hooks/use-assets/types";
import { useController } from "visual/hooks/use-controller/useController";
import { INTERACTION_EVENTS } from "visual/hooks/use-interactions/const";
import {
  EventKey,
  InteractionEventObject,
  InteractionKey,
} from "visual/hooks/use-interactions/types";
import { ThreeJsParams } from "visual/hooks/use-three-js/types";
import { InteractiveObject } from "visual/scenes/interactive-object/InteractiveObject";

// import { GooeyImage } from "visual/scenes/gooey-image/GooeyImage";

export const Sandbox = () => {
  const threeJSParams: ThreeJsParams = {
    camera: { position: { x: 0, y: 30, z: 105 } },
  };

  const interactions: InteractionEventObject[] = [
    {
      eventKey: EventKey.SwipeUp,
      interactionKey: INTERACTION_EVENTS.POSENET.LEFT_WRIST as InteractionKey,
      eventFunction: (shader) => {
        shader.uniforms.delta.value = shader.uniforms.delta.value * -1;
        shader.isRunningThread = true;
      },
    },
    {
      eventKey: EventKey.SwipeDown,
      interactionKey: INTERACTION_EVENTS.POSENET.LEFT_WRIST as InteractionKey,
      eventFunction: (shader) => {
        shader.uniforms.delta.value = shader.uniforms.delta.value * -1;
        shader.isRunningThread = true;
      },
    },
  ];

  const assets: Asset[] = [
    {
      name: "model-geometry",
      url: "../assets/models/ZeusBust.obj",
      assetType: AssetType.Geometry,
    },
    {
      name: "model-texture",
      url: "../assets//textures/obsidian.jpg",
      assetType: AssetType.Texture,
    },
  ];

  const {
    controller,
    updateController,
    onSceneInitialized,
    onAssetsInitialized,
    onFrameworkInitialized,
  } = useController({});

  return (
    <InteractiveObject
      threeJsParams={threeJSParams}
      interactionEvents={interactions}
      assets={assets}
    />
  );
};
