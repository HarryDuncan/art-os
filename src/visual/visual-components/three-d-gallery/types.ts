import { InteractionEventObject } from "visual/helpers/interactions/types";
import { ThreeJsParams } from "visual/hooks/use-three-js/types";

export interface CardItem {
  id: number;
  cardFace: JSX.Element;
}

export interface ThreeDGalleryParams {
  threeJsParams: ThreeJsParams;
  interactionEvents: InteractionEventObject[];
}

export enum GalleryShapeTypes {
  SPHERE = "sphere",
  GRID = "grid",
  HELIX = "helix",
}
