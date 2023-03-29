import { Group, Texture } from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { MATERIAL_TYPES } from "visual/helpers/materials/materials.constants";

export const ASSET_TYPES = {
  Geometry: "geometry",
  Texture: "texture",
  Image: "image",
  Video: "video",
  FONT: "FONT",
};
export const ASSET_TAG = {
  MATERIAL: MATERIAL_TYPES,
};

export type AssetType = keyof typeof ASSET_TYPES;
export type Model = GLTF | Group;
export type AssetData = Model | Texture | HTMLImageElement;

export type AssetTag = keyof typeof ASSET_TAG;
export type Asset = {
  id: string;
  name: string;
  url: string;
  assetType: AssetType;
  data?: AssetData;
  assetTag?: AssetTag[];
};
