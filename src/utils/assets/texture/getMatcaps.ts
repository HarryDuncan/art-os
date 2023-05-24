import { Asset } from "utils/assets/use-assets/types";
import { MATCAP } from "../assets.constants";

export const getMatcaps = (loadedAssets: Asset[]) =>
  loadedAssets.flatMap((asset) => {
    return asset.name.indexOf(MATCAP) !== -1 ? asset : [];
  });
