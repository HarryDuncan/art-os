import { useMemo } from "react";
import { ASSET_TYPES, Asset } from "../asset.types";
import { setupVideo } from "./setUpVideo";

export const initializeVideos = (
  loadedAssets: Asset[],
  isInitialized = true
) => {
  const videoAssets = useMemo(
    () =>
      loadedAssets.flatMap((asset) =>
        asset.assetType === ASSET_TYPES.VIDEO ? asset : []
      ),
    [loadedAssets]
  );
  if (isInitialized) {
    videoAssets.forEach(({ url, name }) => {
      setupVideo(url, name);
    });
  }
};
