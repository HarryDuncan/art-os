import { Texture } from "three";
import { SceneData } from "visual/components/interactive-scene/types";
import { LIGHT_TYPES } from "visual/components/three-js-components/lights/lights.types";
import { getMatcaps } from "visual/helpers/assets/texture/getMatcaps";
import { Asset } from "visual/hooks/use-assets/types";
import { getLTW2SceneComponents } from "./scene-data/getLTW2SceneComponents";

export const formatSceneData = (loadedAssets: Asset[]): SceneData => {
  const matcaps = getMatcaps(loadedAssets);
  const backgroundMatcap = matcaps[1];

  const { sceneComponents, meshConfigs } = getLTW2SceneComponents(loadedAssets);

  const sceneProperties = backgroundMatcap
    ? {
        background: backgroundMatcap.data as Texture,
      }
    : undefined;
  const sceneData: SceneData = {
    isSceneDataInitialized: true,
    meshConfigs: [],

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
  return { ...sceneData, sceneComponents, sceneProperties, meshConfigs };
};
