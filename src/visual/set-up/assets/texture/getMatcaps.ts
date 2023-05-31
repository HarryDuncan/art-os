import { MATCAP } from "../assets.constants";
import { Asset } from "../use-assets/types";

export const getMatcaps = (loadedAssets: Asset[]) =>
  loadedAssets.flatMap((asset) => {
    return asset.name.indexOf(MATCAP) !== -1 ? asset : [];
  });
