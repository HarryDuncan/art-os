import { Group, Texture } from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

export enum ASSET_TYPES {
  Geometry = "geometry",
  Texture = "texture",
  Image = "image",
  Video = "video",
  FONT = "FONT",
}

export type Model = GLTF | Group;

export type AssetData = Model | Texture | HTMLImageElement;

export type Asset = {
  name: string;
  url: string;
  assetType: ASSET_TYPES;
  data?: AssetData;
};
