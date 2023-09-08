import { ScreenType } from "visual/compat/window-state/types";
import { SceneConfig } from "../config.types";
import { useMemo } from "react";

export const useScreenSizeProperties = (
  config: SceneConfig | undefined | null,
  currentScreenType: ScreenType
): SceneConfig | null | undefined =>
  useMemo(() => {
    if (!config || currentScreenType === "DESKTOP") {
      return config;
    }
    const { screenSizeAdjustments } = config;
    if (!screenSizeAdjustments || !screenSizeAdjustments.length) {
      return config;
    }
    const currentAdjustment = screenSizeAdjustments.find(
      ({ screenType }) => screenType === currentScreenType
    );
    if (!currentAdjustment) {
      return config;
    }

    const updatedConfig = {
      ...config,
      threeJsConfig: {
        ...config.threeJsConfig,
        ...(currentAdjustment?.threeJsConfig ?? {}),
      },
    };
    return updatedConfig;
  }, [config, currentScreenType]);
