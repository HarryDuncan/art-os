import { getFileTypeFromFilename } from "utils/getFileType";
import { Asset } from "./types";

export const useAssets = (assets: Asset[]) => {
  console.log(assets);
  assets.forEach(async (asset) => await loadAsset(asset));
};

const loadAsset = async (asset: Asset) => {
  const fileType = getFileTypeFromFilename(asset.url);
  console.log(fileType);
};
