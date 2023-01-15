import { DEFAULT_POSITION } from "consts/threejs";
import { Texture, Vector3 } from "three";
import { SceneData } from "visual/components/interactive-scene/types";
import { LIGHT_TYPES } from "visual/components/three-js-components/lights/lights.types";
import {
  COMPONENT_TYPES,
  TextProps,
} from "visual/components/three-js-components/components/threeJsComponents.types";
import { getGeometriesFromAssets } from "visual/helpers/assets/getGeometriesFromAssets";
import { formatImportedGeometry } from "visual/helpers/geometry/formatImportedGeometry";
import { Asset } from "visual/hooks/use-assets/types";

export const formatSceneData = (loadedAssets: Asset[]): SceneData => {
  console.log(loadedAssets);
  // const geometries = getGeometriesFromAssets(loadedAssets).map((geometry) => ({
  //   geometry: formatImportedGeometry(geometry),
  //   name: geometry.name,
  // }));
  // const matcaps = loadedAssets.flatMap((asset) =>
  //   asset.name.indexOf("matcap") !== -1 ? asset : []
  // );

  const sceneData: SceneData = {
    isSceneDataInitialized: true,
    meshConfigs: [],
    sceneProperties: {},
    sceneComponents: [
      {
        componentType: COMPONENT_TYPES.TEXT,
        componentProps: {
          font: loadedAssets[0].data,
          text: "Harry J Dee",
          name: "title",
        } as TextProps,
      },
    ],
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
  return sceneData;
};
