import { SceneData } from "visual/display/components/interactive-scene";
import { initializeVideos } from "visual/set-up/assets/animated-texture/setUpVideos";
import { formatSceneComponentConfigs } from "visual/set-up/config/components/formatSceneComponentConfigs";
import { getLightsFromConfig } from "visual/set-up/config/lights/getLightsFromConfig";
import { formatGlobalMaterials } from "visual/set-up/config/material/formatGlobalMaterials";
import { getMeshesFromConfig } from "visual/set-up/config/mesh/getMeshesFromConfig";
import { SceneDataConfig } from "./config.types";
import { Asset } from "../assets/use-assets/types";

export const formatSceneData = (
  config: SceneDataConfig,
  assets: Asset[]
): SceneData => {
  initializeVideos(assets);
  const materials = formatGlobalMaterials(assets, config);
  const meshes = getMeshesFromConfig(assets, materials, config);
  const lights = getLightsFromConfig(config);
  const sceneComponents = formatSceneComponentConfigs(config, materials);
  return {
    meshes: meshes ?? [],
    sceneComponents: sceneComponents ?? [],
    lights: lights ?? [],
  };
};
