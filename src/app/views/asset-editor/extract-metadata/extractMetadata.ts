import { BufferGeometry } from "three";
import { Asset } from "visual/set-up/assets/asset.types";

export const extractMetadata = (assets: Asset[]) =>
  assets.map((asset) => {
    // @ts-ignore todo - safely get all geometries for different data types
    const geometry = asset.data?.children[0].geometry;
    const boundingBox = getBoundingBox(geometry);
    const assetData = {
      ...asset,
      metaData: {
        boundingBox,
      },
    };
    delete assetData.data;
    return assetData;
  });

const getBoundingBox = (bufferGeometry: BufferGeometry) => {
  const positions = bufferGeometry.attributes.position.array;

  let minX = Infinity;
  let minY = Infinity;
  let minZ = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  let maxZ = -Infinity;

  // Loop through the vertices and update the min/max values
  for (let i = 0; i < positions.length; i += 3) {
    const x = positions[i];
    const y = positions[i + 1];
    const z = positions[i + 2];

    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    minZ = Math.min(minZ, z);

    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
    maxZ = Math.max(maxZ, z);
  }

  return {
    min: { x: minX, y: minY, z: minZ },
    max: { x: maxX, y: maxY, z: maxZ },
  };
};
