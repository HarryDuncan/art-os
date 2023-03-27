import { Group, Texture } from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

export const ASSET_TYPES = {
  Geometry: "geometry",
  Texture: "texture",
  Image: "image",
  Video: "video",
  FONT: "FONT",
};
export type AssetType = keyof typeof ASSET_TYPES;
export type Model = GLTF | Group;

export type AssetData = Model | Texture | HTMLImageElement;

export type Asset = {
  name: string;
  url: string;
  assetType: AssetType;
  data?: AssetData;
};
