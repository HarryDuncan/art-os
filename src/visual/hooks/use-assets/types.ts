import { Group, Texture } from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

export enum AssetType {
  Geometry = "geometry",
  Texture = "texture",
  Image = "image",
  Video = "video",
}

export type Model = GLTF | Group;

export type AssetData = Model | Texture | HTMLImageElement;

export type Asset = {
  name: string;
  url: string;
  assetType: AssetType;
  data?: AssetData;
};
