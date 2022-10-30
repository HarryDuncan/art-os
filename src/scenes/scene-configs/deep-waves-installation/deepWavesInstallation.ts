import { Euler, Vector3 } from "three";
import { InteractiveThreeScene } from "visual/components/interactive-scene/InteractiveScene";
import {
  Binding,
  BodySegInteractionKeys,
  EventKey,
  ModelTypes,
} from "visual/helpers/interactions/types";
import { AssetType } from "visual/hooks/use-assets/types";
import { formatSceneData } from "./formatSceneData";

export const deepWavesInstallation = () => ({
  threeJsParams: {
    camera: { position: { x: 0, y: 10, z: 30 } },
  },
  modelType: ModelTypes.BODYSEG,
  formatSceneData,
  assets: [
    {
      name: "geometry",
      url: "../assets/models/AresBust.obj",
      assetType: AssetType.Geometry,
    },
    {
      name: "matcap",
      url: "../assets/textures/obsidian.jpg",
      assetType: AssetType.Texture,
    },
  ],
  interactions: [
    {
      eventKey: EventKey.MultiplePositions,
      binding: Binding.InteractiveScene,
      interactionKey: BodySegInteractionKeys.PersonPosition,
      eventFunction: (scene: InteractiveThreeScene, details) => {
        details.forEach((detail, index) => {
          if (!detail) return;
          const child = scene.children[index] ?? null;
          if (!child) return;
          console.log(detail.x);
          child.lookAt(new Vector3(detail.y, 0, fullScale(detail.x, 640)));
        });
      },
    },
  ],
  sceneFunctions: {
    onTimeUpdate: (scene: InteractiveThreeScene) => {},
  },
});

const fullScale = (value, maxLength) => {
  return value - maxLength / 2;
};
