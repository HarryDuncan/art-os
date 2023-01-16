import { DEFAULT_POSITION } from "consts/threejs";
import { PlaneGeometry } from "three";
import { SceneComponentConfig } from "visual/components/interactive-scene/types";
import {
  COMPONENT_TYPES,
  TextProps,
} from "visual/components/three-js-components/components/threeJsComponents.types";
import { getMatcaps } from "visual/helpers/assets/getMatcaps";
import { coordinatesToVector3 } from "visual/helpers/conversion/coordinatesToVector3";
import { createBoundingBox } from "visual/helpers/three-dimension-space/createBoundingBox";
import { getEquidistantCoordinates } from "visual/helpers/three-dimension-space/position/getEquidistantCoordinates";
import { getRandomCoordinatesInBoundingBoxes } from "visual/helpers/three-dimension-space/position/getRandomCoordsBoundingBoxes";
import {
  AXIS,
  BoundingBox,
} from "visual/helpers/three-dimension-space/position/position.types";
import { Asset } from "visual/hooks/use-assets/types";

export const getLTW2SceneComponents = (
  loadedAssets: Asset[]
): SceneComponentConfig[] => {
  const matcaps = getMatcaps(loadedAssets);
  const mirrors = getMirrors();
  const text = getText(matcaps);
  return [...text, ...mirrors];
};

const getMirrors = (): SceneComponentConfig[] => {
  const allowedBoundingBoxes: BoundingBox[] = [
    createBoundingBox({ x: 0, y: 0, z: 0 }, 16, 16, 16),
  ];
  const notAllowedBoundingBoxes: BoundingBox[] = [
    createBoundingBox({ x: 0, y: 0, z: 3 }, 8, 5, 8),
  ];
  const textBBox = createBoundingBox(
    DEFAULT_POSITION,
    TEXT_BBOX_SCHEMA.width,
    TEXT_BBOX_SCHEMA.height,
    TEXT_BBOX_SCHEMA.depth
  );
  notAllowedBoundingBoxes.push(textBBox);
  const coordinates = getRandomCoordinatesInBoundingBoxes(
    allowedBoundingBoxes,
    notAllowedBoundingBoxes,
    5
  );
  const mirrors = coordinates.map((position, index) => ({
    componentType: COMPONENT_TYPES.MIRROR,
    componentProps: {
      name: `mirror-${index}`,
      geometry: new PlaneGeometry(5, 5),
      position: coordinatesToVector3(position),
    },
  }));

  return mirrors;
};
const TEXT_BBOX_SCHEMA = { height: 20, width: 10, depth: 0 };
const getText = (matcaps: Asset[]) => {
  const textBBox = createBoundingBox(
    DEFAULT_POSITION,
    TEXT_BBOX_SCHEMA.width,
    TEXT_BBOX_SCHEMA.height,
    TEXT_BBOX_SCHEMA.depth
  );
  const textPositions = getEquidistantCoordinates(15, textBBox, AXIS.Y);
  console.log(textPositions);
  return textPositions.map((position, index) => ({
    componentType: COMPONENT_TYPES.TEXT,
    componentProps: {
      fontUrl: "../assets/AnimationS.woff",
      text: "Harry J Dee",
      name: `title-${index}`,
      materialProps: {
        matcap: matcaps[0].data,
      },
      position: coordinatesToVector3(position),
    } as TextProps,
  }));
};
