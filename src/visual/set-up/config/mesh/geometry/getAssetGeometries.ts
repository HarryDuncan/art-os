import { FILE_TYPES } from "visual/consts";
import {
  ASSET_TYPES,
  Asset,
  LoadedGroup,
  LoadedObjChild,
} from "../../../assets/asset.types";
import { getFileTypeFromFilename } from "visual/utils/file/file";

export const getAssetGeometries = (assets: Asset[]) =>
  assets.flatMap((asset) => {
    const geometry = getAssetGeometry(asset);
    return geometry ?? [];
  });

export const getAssetGeometry = (asset: Asset) => {
  const { assetType, url, data, name } = asset;
  if (assetType !== ASSET_TYPES.MODEL3D || !data) {
    return null;
  }
  const modelFileType = getFileTypeFromFilename(url);
  switch (modelFileType) {
    case FILE_TYPES.MODELS.OBJ:
      return getObjectGeometries(data as LoadedGroup, name);
    default:
      console.warn(`no formatting for ${modelFileType}`);
      return null;
  }
};

const getObjectGeometries = (data: LoadedGroup, name: string) => {
  const { children } = data;
  if (children.length) {
    return children.map((child: LoadedObjChild) => ({
      name: child.name,
      geometry: child.geometry,
    }));
  }
  console.warn(`geometry not valid ${name}`);
  return [];
};

export const getAssetBufferGeometry = (asset: Asset) => {
  const assetGeometry = getAssetGeometry(asset);
  if (assetGeometry) {
    return assetGeometry[0].geometry;
  }
  console.warn(`no buffer geometry found for ${asset.name}`);
};
