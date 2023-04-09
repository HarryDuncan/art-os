import { getLightsFromConfig } from "scenes/config-helpers/lights/getLightsFromConfig";
import { formatGlobalMaterials } from "scenes/config-helpers/material/formatGlobalMaterials";
import { formatSceneComponentConfigs } from "scenes/config-helpers/components/formatSceneComponentConfigs";
import { initializeVideos } from "utils/assets/animated-texture/setUpVideos";
import { getMeshesFromConfig } from "scenes/config-helpers/mesh/getMeshesFromConfig";
import { SceneData } from "visual/components/interactive-scene";
import HeatPad from "visual/components/heat-pad/HeatPad";

export const formatSceneData = (config, assets): SceneData => {
  const materials = formatGlobalMaterials(assets, config);
  const meshes = getMeshesFromConfig(assets, materials, config);
  const lights = getLightsFromConfig(config);
  initializeVideos(assets);
  const sceneComponents = formatSceneComponentConfigs(config, materials);
  const interactionComponents = setUpInteractionComponents();
  return {
    meshes,
    sceneComponents,
    lights,
    interactionComponents,
  };
};

const setUpInteractionComponents = () => {
  return [new HeatPad()];
};
