import { initializeVideos } from "visual/set-up/assets/animated-texture/setUpVideos";
import { formatSceneComponentConfigs } from "visual/set-up/config/components/formatSceneComponentConfigs";
import { getLightsFromConfig } from "visual/set-up/config/lights/getLightsFromConfig";
import { formatGlobalMaterials } from "visual/set-up/config/material/formatGlobalMaterials";
import { getMeshesFromConfig } from "visual/set-up/config/mesh/getMeshesFromConfig";
import { SceneConfig } from "./config.types";
import { Asset } from "../assets/asset.types";
import { getScenePropertiesFromConfig } from "./scene-properties/setSceneProperties";
import { useThreeJsFromConfig } from "./three-js/useThreeJsFromConfig";
import { useMemo } from "react";
import { SceneData } from "visual/display/components/interactive-scene/types";

export const useSceneData = (
  config: SceneConfig | undefined | null,
  assets: Asset[],
  areAssetsInitialized: boolean
): SceneData | null => {
  initializeVideos(assets);
  const setUpThreeJs = useThreeJsFromConfig();
  return useMemo(() => {
    if (!areAssetsInitialized || !config) return null;
    const threeJs = setUpThreeJs(config.threeJsConfig);
    const materials = formatGlobalMaterials(assets, config);
    const meshes = getMeshesFromConfig(assets, materials, config);
    const lights = getLightsFromConfig(config);
    const sceneComponents = formatSceneComponentConfigs(config, materials);
    const sceneProperties = getScenePropertiesFromConfig(
      config.scenePropertiesConfig
    );
    return {
      threeJs,
      meshes: meshes ?? [],
      sceneComponents: sceneComponents ?? [],
      lights: lights ?? [],
      sceneProperties,
    };
  }, [setUpThreeJs, config, assets, areAssetsInitialized]);
};
