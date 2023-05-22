import { getLightsFromConfig } from "scenes/config-helpers/lights/getLightsFromConfig";
import { formatGlobalMaterials } from "scenes/config-helpers/material/formatGlobalMaterials";
import { formatSceneComponentConfigs } from "scenes/config-helpers/components/formatSceneComponentConfigs";
import { initializeVideos } from "utils/assets/animated-texture/setUpVideos";
import { getMeshesFromConfig } from "scenes/config-helpers/mesh/getMeshesFromConfig";
import { SceneData } from "visual/components/interactive-scene";

export const formatSceneData = (config, assets): SceneData => {
  initializeVideos(assets);
  const materials = formatGlobalMaterials(assets, config);
  const meshes = getMeshesFromConfig(assets, materials, config);
  const lights = getLightsFromConfig(config);
  const sceneComponents = formatSceneComponentConfigs(config, materials);
  console.log(meshes);
  return {
    meshes: meshes ?? [],
    sceneComponents: sceneComponents ?? [],
    lights: lights ?? [],
  };
};
