import { initializeVideos } from "visual/set-up/assets/animated-texture/setUpVideos";
import { formatSceneComponentConfigs } from "visual/set-up/config/components/formatSceneComponentConfigs";
import { getLightsFromConfig } from "visual/set-up/config/lights/getLightsFromConfig";
import { formatGlobalMaterials } from "visual/set-up/config/material/formatGlobalMaterials";
import { getMeshesFromConfig } from "visual/set-up/config/mesh/getMeshesFromConfig";
import { SceneConfig, SceneData } from "./config.types";
import { Asset } from "../assets/asset.types";
import { getScenePropertiesFromConfig } from "./scene-properties/setSceneProperties";
import { useThreeJsFromConfig } from "./three-js/useThreeJsFromConfig";
import { useMemo } from "react";
import { useScreenSizeProperties } from "./scene-properties/useScreenSizeProperties";
import { useWindowState } from "visual/compat/window-state/windowStateProvider";

export const useSceneData = (
  config: SceneConfig | undefined | null,
  assets: Asset[],
  areAssetsInitialized: boolean
): SceneData | null => {
  initializeVideos(assets, areAssetsInitialized);
  const setUpThreeJs = useThreeJsFromConfig();
  const {
    state: { screenType },
  } = useWindowState();
  const formattedConfig = useScreenSizeProperties(config, screenType);
  return useMemo(() => {
    if (!areAssetsInitialized || !formattedConfig) return null;
    const threeJs = setUpThreeJs(formattedConfig.threeJsConfig);
    const materials = formatGlobalMaterials(assets, formattedConfig);
    const meshes = getMeshesFromConfig(assets, materials, formattedConfig);
    const lights = getLightsFromConfig(formattedConfig);
    const sceneComponents = formatSceneComponentConfigs(
      formattedConfig,
      materials
    );
    const sceneProperties = getScenePropertiesFromConfig(
      formattedConfig.scenePropertiesConfig
    );
    return {
      threeJs,
      meshes: meshes ?? [],
      sceneComponents: sceneComponents ?? [],
      lights: lights ?? [],
      sceneProperties,
    };
  }, [setUpThreeJs, formattedConfig, assets, areAssetsInitialized]);
};
