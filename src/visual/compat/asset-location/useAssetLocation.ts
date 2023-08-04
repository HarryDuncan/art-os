import { useMemo } from "react";
import { SceneConfig } from "visual/set-up/config/config.types";

export const useAssetLocation = (configData: SceneConfig[] | null) => {
  const staticContentRootUrl = useContentUrl();
  return useMemo(
    () =>
      configData?.map((config) => {
        const updatedAssets = config.assets?.map((asset) => ({
          ...asset,
          url: `${staticContentRootUrl}${asset.url}`,
        }));
        return {
          ...config,
          assets: updatedAssets,
        };
      }),
    [staticContentRootUrl, configData]
  );
};

const useContentUrl = () => {
  return useMemo(() => {
    if (process.env.NEXT_PUBLIC_CONTENT_ROOT) {
      return process.env.NEXT_PUBLIC_CONTENT_ROOT;
    }
    return "";
  }, []);
};
