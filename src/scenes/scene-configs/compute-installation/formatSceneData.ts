import {
  DEFAULT_LIGHTS,
  DEFAULT_POSITION,
  DEFAULT_VECTOR_POSITION,
} from "consts/threejs";
import { SceneData } from "visual/components/interactive";
import {
  COMPONENT_TYPES,
  ThreeJsComponentType,
} from "visual/components/three-js-components/components/threeJsComponents.types";
import { addMaterialsToMeshConfig } from "visual/helpers/assets/mesh-config/addMaterialsToMeshConfig";
import { formatToMeshConfig } from "visual/helpers/assets/mesh-config/formatToMeshConfig";
import {
  ENV_MAP_TYPES,
  MATERIAL_TYPES,
} from "visual/helpers/materials/materials.constants";
import {
  EnvMapMaterialParameters,
  EnvMapType,
  MaterialType,
} from "visual/helpers/materials/materials.types";

import computeConfig from "./config.json";

export const formatSceneData = (assets, context, dispatch): SceneData => {
  const meshConfigs = getMeshConfigs(assets);
  return {
    isSceneDataInitialized: true,
    meshConfigs,
    sceneComponents: [
      {
        componentType: COMPONENT_TYPES.MARCHING_CUBES as ThreeJsComponentType,
        componentProps: {
          name: "marching-cubes-home",
          parameters: {
            resolution: 120,
          },
          position: DEFAULT_VECTOR_POSITION,
          material: {
            material: {
              imageUrl: "../assets/textures/cube-mapping/sculpture",
              envMapType: ENV_MAP_TYPES.REFLECTION as EnvMapType,
            } as EnvMapMaterialParameters,
            materialType: MATERIAL_TYPES.ENV_MAP as MaterialType,
          },
        },
      },
    ],
    lights: DEFAULT_LIGHTS,
    sceneObjects: [],
  };
};

const getMeshConfigs = (assets) => {
  const formattedGeometries = formatToMeshConfig(assets, computeConfig[0]);
  const meshConfigs = addMaterialsToMeshConfig(
    formattedGeometries,
    computeConfig[0]
  );
  return meshConfigs;
};
