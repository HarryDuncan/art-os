import { BufferGeometry } from "three";
import { Asset } from "visual/set-up/assets/asset.types";
import { getPositionsLength } from "visual/set-up/config/mesh/geometry/attributes/attribute.functions";
import { getAssetBufferGeometry } from "visual/set-up/config/mesh/geometry/getAssetGeometries";
import { getGeometryBoundingBox } from "../buffer-geometry/getGeometryBoundingBox";

export const extractMetadata = (assets: Asset[]): Asset[] =>
  assets.flatMap((asset) => {
    const bufferGeometry = getAssetBufferGeometry(asset);
    if (!bufferGeometry) return [];
    const boundingBox = getGeometryBoundingBox(bufferGeometry);
    const vertexCount = getPositionsLength(bufferGeometry);
    const assetData = {
      ...asset,
      metaData: {
        boundingBox,
        vertexCount,
      },
    };
    delete assetData.data;
    return assetData;
  });
