import { PlaneGeometry } from "three";
import { SceneComponentConfig } from "visual/components/interactive-scene/types";
import { COMPONENT_TYPES } from "visual/components/three-js-components/components/threeJsComponents.types";
import { coordinatesToVector3 } from "visual/helpers/conversion/coordinatesToVector3";
import { createBoundingBox } from "visual/helpers/three-dimension-space/createBoundingBox";
import { generateRandomlySpreadCoordinates } from "visual/helpers/three-dimension-space/position/getRandomlySpreadCoordinates";
import { BoundingBox } from "visual/helpers/three-dimension-space/position/position.types";
import { MIRROR_HEIGHT, MIRROR_WIDTH } from "./constants";

export const getMirrors = (): SceneComponentConfig[] => {
  const allowedBoundingBoxes: BoundingBox[] = [
    createBoundingBox({ x: 0, y: 0, z: -5 }, 30, 55, 20),
  ];
  const notAllowedBoundingBoxes: BoundingBox[] = [
    createBoundingBox({ x: 0, y: 0, z: 3 }, 8, 5, 10),
  ];

  const coordinates = generateRandomlySpreadCoordinates(
    4,
    allowedBoundingBoxes,
    notAllowedBoundingBoxes,
    7
  );

  const mirrors = coordinates.map((position, index) => ({
    componentType: COMPONENT_TYPES.MIRROR,
    componentProps: {
      name: `mirror-${index}`,
      geometry: new PlaneGeometry(MIRROR_WIDTH, MIRROR_HEIGHT),
      position: coordinatesToVector3(position),
    },
  }));

  return mirrors;
};
