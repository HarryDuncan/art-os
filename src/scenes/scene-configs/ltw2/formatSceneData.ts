import { DEFAULT_POSITION } from "consts/threejs";
import { BoxGeometry, PlaneGeometry, Texture, Vector3 } from "three";
import {
  SceneComponentConfig,
  SceneData,
} from "visual/components/interactive-scene/types";
import { LIGHT_TYPES } from "visual/components/three-js-components/lights/lights.types";
import { Asset } from "visual/hooks/use-assets/types";
import { getLTW2SceneComponents } from "./scene-data/getLTW2SceneComponents";

export const formatSceneData = (loadedAssets: Asset[]): SceneData => {
  console.log(loadedAssets);

  const matcaps = loadedAssets.flatMap((asset) =>
    asset.name.indexOf("matcap") !== -1 ? asset : []
  );
  const backgroundMatcap = matcaps[1];

  const sceneComponents = getLTW2SceneComponents(loadedAssets);
  const sceneData: SceneData = {
    isSceneDataInitialized: true,
    meshConfigs: [],
    sceneProperties: {
      background: backgroundMatcap.data as Texture,
    },

    lights: [
      {
        name: "ambient-light",
        lightType: LIGHT_TYPES.AMBIENT,
      },
      {
        name: "point-light",
        lightType: LIGHT_TYPES.POINT_LIGHT,
      },
      {
        name: "directional-light",
        lightType: LIGHT_TYPES.DIRECTIONAL_LIGHT,
      },
    ],
  };
  return { ...sceneData, sceneComponents };
};
