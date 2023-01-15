import { VIDEO } from "app/constants";
import { Euler, Vector3 } from "three";
import { InteractiveThreeScene } from "visual/components/interactive-scene/InteractiveScene";
import {
  Binding,
  BodySegInteractionKeys,
  EventKey,
  ModelTypes,
} from "visual/helpers/interactions/types";
import { ASSET_TYPES } from "visual/hooks/use-assets/types";
import { formatSceneData } from "./formatSceneData";

export const deepWavesInstallation = () => ({
  threeJsParams: {
    camera: { position: { x: 0, y: 10, z: 30 } },
  },
  modelType: ModelTypes.BODYSEG,
  formatSceneData,
  assets: [
    {
      name: "geometry1",
      url: "../assets/models/AresBust.obj",
      assetType: ASSET_TYPES.Geometry,
    },
    {
      name: "matcap1",
      url: "../assets/textures/redobsidian.jpg",
      assetType: ASSET_TYPES.Texture,
    },
    {
      name: "geometry2",
      url: "../assets/models/AphroditeBust.obj",
      assetType: ASSET_TYPES.Geometry,
    },
    {
      name: "matcap2",
      url: "../assets/textures/greenobsidian.jpg",
      assetType: ASSET_TYPES.Texture,
    },
    {
      name: "geometry3",
      url: "../assets/models/ZeusBust.obj",
      assetType: ASSET_TYPES.Geometry,
    },
    {
      name: "matcap3",
      url: "../assets/textures/blueobsidian.jpg",
      assetType: ASSET_TYPES.Texture,
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
          var newDir = new Vector3(detail.y, 0, fullScale(detail.x, 640));
          var pos = new Vector3();
          pos.addVectors(newDir, child.position);
          child.lookAt(pos);
        });
      },
    },
  ],
  sceneFunctions: {
    onTimeUpdate: (scene: InteractiveThreeScene) => {},
  },
  video: {
    src: `${VIDEO}seq.mp4`,
  },
});

const fullScale = (value, maxLength) => {
  return value - maxLength / 2;
};
