import { Asset } from "visual/hooks/use-assets/types";
import { MATCAP } from "./assets.constants";

export const getMatcaps = (loadedAssets: Asset[]) =>
  loadedAssets.flatMap((asset) =>
    asset.name.indexOf(MATCAP) !== -1 ? asset : []
  );
