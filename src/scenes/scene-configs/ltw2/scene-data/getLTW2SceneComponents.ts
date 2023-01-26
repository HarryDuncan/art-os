import { DEFAULT_POSITION } from "consts/threejs";
import { PlaneGeometry } from "three";
import { SceneComponentConfig } from "visual/components/interactive-scene/types";
import {
  COMPONENT_TYPES,
  TextProps,
} from "visual/components/three-js-components/components/threeJsComponents.types";
import { getMatcaps } from "visual/helpers/assets/texture/getMatcaps";
import { coordinatesToVector3 } from "visual/helpers/conversion/coordinatesToVector3";
import { MeshConfig } from "visual/helpers/assets/geometry/types";
import { createBoundingBox } from "visual/helpers/three-dimension-space/createBoundingBox";
import { getEquidistantCoordinates } from "visual/helpers/three-dimension-space/position/getEquidistantCoordinates";
import { generateRandomlySpreadCoordinates } from "visual/helpers/three-dimension-space/position/getRandomlySpreadCoordinates";
import {
  AXIS,
  BoundingBox,
} from "visual/helpers/three-dimension-space/position/position.types";
import { Asset } from "visual/hooks/use-assets/types";
import {
  CONFIGS,
  CONFIG_INDEX,
  MIRROR_HEIGHT,
  MIRROR_WIDTH,
  TEXT_BBOX_SCHEMA,
} from "../ltw2.constants";
import { getMeshConfigs } from "./getMeshConfigs";

export const getLTW2SceneComponents = (
  loadedAssets: Asset[]
): { sceneComponents: SceneComponentConfig[]; meshConfigs: MeshConfig[] } => {
  const matcaps = getMatcaps(loadedAssets);
  const { mirrors, mirrorExclusionZones } = getMirrors();
  const meshConfigs = getMeshConfigs(loadedAssets, mirrorExclusionZones);
  const text = getText(matcaps);
  return { sceneComponents: [...text, ...mirrors], meshConfigs };
};

const getMirrors = (): {
  mirrors: SceneComponentConfig[];
  mirrorExclusionZones: BoundingBox[];
} => {
  const allowedBoundingBoxes: BoundingBox[] = [
    createBoundingBox({ x: 0, y: 0, z: -5 }, 13, 8, 7),
  ];
  const notAllowedBoundingBoxes: BoundingBox[] = [
    createBoundingBox({ x: 0, y: 0, z: 3 }, 8, 5, 10),
  ];
  const textBBox = createBoundingBox(
    DEFAULT_POSITION,
    TEXT_BBOX_SCHEMA.width,
    TEXT_BBOX_SCHEMA.height,
    TEXT_BBOX_SCHEMA.depth
  );
  notAllowedBoundingBoxes.push(textBBox);
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
  const mirrorExclusionZones = coordinates.map((coordinate) =>
    createBoundingBox(coordinate, MIRROR_WIDTH, MIRROR_HEIGHT, 1)
  );
  return { mirrors, mirrorExclusionZones };
};

const getText = (matcaps: Asset[]) => {
  const textBBox = createBoundingBox(
    DEFAULT_POSITION,
    TEXT_BBOX_SCHEMA.width,
    TEXT_BBOX_SCHEMA.height,
    TEXT_BBOX_SCHEMA.depth
  );
  const textPositions = getEquidistantCoordinates(15, textBBox, AXIS.Y);
  return textPositions.map((position, index) => ({
    componentType: COMPONENT_TYPES.TEXT,
    componentProps: {
      fontUrl: "../assets/fonts/AnimationS.woff",
      text: CONFIGS[CONFIG_INDEX].text,
      name: `title-${index}`,
      materialProps: {
        matcap: matcaps[0].data,
      },
      position: coordinatesToVector3(position),
    } as TextProps,
  }));
};
