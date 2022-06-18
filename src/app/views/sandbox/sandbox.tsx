import React from "react";
import { Asset, AssetType } from "visual/hooks/use-assets/types";
import { INTERACTION_EVENTS } from "visual/hooks/use-interactions/const";
import {
  EventKey,
  InteractionEventObject,
  InteractionKey,
} from "visual/hooks/use-interactions/types";
import InteractiveMaterial from "visual/hooks/use-interactive-material/InteractiveMaterial";
import { InteractiveScenes } from "visual/hooks/use-interactive-material/types";
import { useInteractiveMaterialParams } from "visual/hooks/use-interactive-material/useInteractiveMaterialParams";
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
      eventFunction: (material: InteractiveMaterial) => {
        material.uniforms.delta.value = material.uniforms.delta.value * -1;
        material.isRunningThread = true;
      },
    },
    {
      eventKey: EventKey.SwipeDown,
      interactionKey: INTERACTION_EVENTS.POSENET.LEFT_WRIST as InteractionKey,
      eventFunction: (material: InteractiveMaterial) => {
        material.uniforms.delta.value = material.uniforms.delta.value * -1;
        material.isRunningThread = true;
      },
    },
  ];

  const assets: Asset[] = [
    {
      name: "geometry",
      url: "../assets/models/ZeusBust.obj",
      assetType: AssetType.Geometry,
    },
    {
      name: "matcap",
      url: "../assets/textures/obsidian.jpg",
      assetType: AssetType.Texture,
    },
  ];

  const materialParams = useInteractiveMaterialParams(
    InteractiveScenes.VANISHING_OBJECT
  );

  return (
    <InteractiveObject
      threeJsParams={threeJSParams}
      interactionEvents={interactions}
      assets={assets}
      materialParams={materialParams}
    />
  );
};
