import { formatGeometriesFromAsset } from "visual/helpers/assets/geometry/formatGeometryFromAsset";
import { getMatcaps } from "visual/helpers/assets/texture/getMatcaps";
import { Asset } from "visual/hooks/use-assets/types";
import { getMeshConfigs } from "./getMeshConfig";
import { getMirrors } from "./getMirrors";

export const formatSceneData = (loadedAssets: Asset[]) => {
  // format the geometry
  const geometries = formatGeometriesFromAsset(loadedAssets);

  const matcaps = getMatcaps(loadedAssets);
  const meshMatcap = matcaps[0];
  // set up the mesh data
  const meshConfigs = getMeshConfigs(geometries, meshMatcap);
  const sceneComponents = getMirrors();
  return {
    isSceneDataInitialized: true,
    sceneComponents,
    meshConfigs,
  };
};
