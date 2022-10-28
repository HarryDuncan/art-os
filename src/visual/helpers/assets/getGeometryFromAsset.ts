import { getFileTypeFromFilename } from "utils/getFileType";
import { FILE_TYPES } from "consts";
import { Asset } from "visual/hooks/use-assets/types";

export const getGeometryFromAsset = (assets: Asset[]) => {
  const geometry = assets.find((asset) => asset.name === "geometry");
  if (geometry) {
    const geometryType = getFileTypeFromFilename(geometry?.url);
    switch (geometryType) {
      case FILE_TYPES.MODELS.GLTF:
        return geometry;
      case FILE_TYPES.MODELS.OBJ:
        return getGeometryFromObj(geometry);
      default:
        return geometry;
    }
  }
};

const getGeometryFromObj = (object) => object.data.children[0].geometry;
