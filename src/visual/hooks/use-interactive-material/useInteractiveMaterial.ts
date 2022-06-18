import { useMemo } from "react";
import { Vector3 } from "three";
import { getGeometryAsset } from "visual/helpers/assets/getGeometryAsset";
import { Asset } from "../use-assets/types";
import { InteractionEventObject } from "../use-interactions/types";
import { InteractiveParam } from "./types";
import { useCreateInteractiveMesh } from "./useCreateInteractiveMesh";

export const useInteractiveMaterial = (
  materialParams: InteractiveParam,
  interactionEvents: InteractionEventObject[],
  areAssetsInitialized: boolean,
  assets: Asset[]
) => {
  const createInteractiveMesh = useCreateInteractiveMesh();

  // Interactive mesh must be created after assets are loaded - in case we use any geometries/textures
  const interactiveMesh = useMemo(() => {
    if (!areAssetsInitialized) return;
    const { geometry, uniforms, shaders } = formatAssets(
      assets,
      materialParams
    );

    return createInteractiveMesh(
      interactionEvents,
      geometry,
      uniforms,
      shaders
    );
  }, [
    areAssetsInitialized,
    assets,
    createInteractiveMesh,
    interactionEvents,
    materialParams,
  ]);

  return interactiveMesh;
};

const formatAssets = (assets, materialParams) => {
  const { uniforms, shaders } = Object.assign(materialParams);
  const geometry = getGeometryAsset(assets);
  const matcap = assets.find((asset) => asset.name === "matcap").data;

  uniforms.matcap.value = matcap;

  const geom = geometry.clone();

  geom.computeBoundingBox();

  const size = new Vector3();
  geom.boundingBox.getSize(size);
  uniforms.size.value.copy(size);
  return { geometry: geom, uniforms, shaders };
};
