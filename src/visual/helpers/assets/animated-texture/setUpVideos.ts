import { Asset } from "visual/hooks/use-assets/types";
import { setupVideo } from "./setUpVideo";

export const initializeVideos = (loadedAssets: Asset[]) => {
  const videoAssets = loadedAssets.flatMap((asset) =>
    asset.name.indexOf("video") === -1 ? [] : asset
  );
  videoAssets.forEach(({ url, name }) => {
    setupVideo(url, name);
  });
};
