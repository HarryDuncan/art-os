import { useEffect, useState } from "react";
import { Asset } from "../asset.types";
import { useInitializeAssets } from "./useInitializeAssets";

export const useAssets = (assets: Asset[]) => {
  const [areAssetsInitialized, setAreAssetsInitialized] = useState(false);
  const [initializedAssets, setInitializedAssets] = useState<Asset[]>([]);
  const initializeAssets = useInitializeAssets(assets);
  useEffect(() => {
    async function getAssets() {
      const loadedAssets = await initializeAssets();
      setAreAssetsInitialized(true);
      setInitializedAssets(loadedAssets);
    }
    getAssets();
  }, [assets, initializeAssets]);

  return { initializedAssets, areAssetsInitialized };
};
