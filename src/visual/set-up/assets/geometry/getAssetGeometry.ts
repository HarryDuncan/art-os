import { FILE_TYPES } from "visual/consts";
import {
  ASSET_TYPES,
  Asset,
  LoadedGroup,
  LoadedObjChild,
} from "../asset.types";
import { getFileTypeFromFilename } from "visual/set-up/config/utils/file";

export const getAssetGeometry = (assets: Asset[]) => {
  const geometryAssets = assets.filter(
    (asset: Asset) => asset.assetType === ASSET_TYPES.GEOMETRY
  );
  if (!geometryAssets || !geometryAssets.length) {
    console.warn("no geometryAssets were found");
    return [];
  }
  return geometryAssets.flatMap((geometryAsset) => {
    const modelFileType = getFileTypeFromFilename(geometryAsset?.url);
    switch (modelFileType) {
      case FILE_TYPES.MODELS.OBJ:
        return getObjectGeometries(geometryAsset);
      default:
        console.warn(`no formatting for ${modelFileType}`);
        return [];
    }
  });
};

const getObjectGeometries = (geometryAsset: Asset) => {
  const { children } = geometryAsset.data as LoadedGroup;
  if (children.length) {
    return children.map((child: LoadedObjChild) => ({
      name: child.name,
      geometry: child.geometry,
    }));
  }
  console.warn(`geometry not valid ${geometryAsset.name}`);
  return [];
};
