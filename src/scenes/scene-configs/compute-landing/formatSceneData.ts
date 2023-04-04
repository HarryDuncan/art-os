import { SceneData } from "visual/components/interactive";
import { getMeshConfigs } from "visual/helpers/assets/mesh-config/getMeshConfigs";
import { getRandomRotation } from "visual/helpers/getRandomRotation";
import { createBoundingBox } from "visual/helpers/three-dimension-space/createBoundingBox";
import { generateRandomlySpreadCoordinates } from "visual/helpers/three-dimension-space/position/getRandomlySpreadCoordinates";
import { BoundingBox } from "visual/helpers/three-dimension-space/position/position.types";
import { getLightsFromConfig } from "scenes/config-helpers/getLightsFromConfig";
import computeConfig from "./config.json";
import {
  COMPONENT_TYPES,
  PlaneProps,
  ThreeJsComponentType,
} from "visual/scene-elements/components/threeJsComponents.types";
import { getMaterialById } from "visual/helpers/materials/getMaterialById";
import { SceneDataConfig } from "scenes/config-helpers/config.types";
import { formatGlobalMaterials } from "scenes/config-helpers/formatGlobalMaterials";

export const formatSceneData = (assets, context, dispatch): SceneData => {
  const config = computeConfig[0] as SceneDataConfig;
  const materials = formatGlobalMaterials(assets, config);
  const meshConfigs = getMeshConfigs(assets, materials, config);
  const formattedMeshConfigs = setUpMeshConfigs(meshConfigs);
  const lights = getLightsFromConfig(config);

  return {
    isSceneDataInitialized: true,
    meshConfigs: formattedMeshConfigs,
    sceneComponents: [
      {
        componentType: COMPONENT_TYPES.PLANE as ThreeJsComponentType,
        componentProps: {
          name: "bg",
          position: { x: -5, y: -5, z: -6 },
          material: getMaterialById("compute-background", materials),
        } as PlaneProps,
      },
    ],
    lights,
    sceneObjects: [],
  };
};

const setUpMeshConfigs = (formattedMeshConfigs) => {
  const withBinary = setOnesAndZeros(formattedMeshConfigs);
  // const withLines = setLines(withBinary);
  return withBinary;
};
const setOnesAndZeros = (formattedMeshConfigs) => {
  const one = formattedMeshConfigs.find((mesh) => mesh.name === "one-geometry");
  const zero = formattedMeshConfigs.find(
    (mesh) => mesh.name === "zero-geometry"
  );
  const filteredMeshConfigs = formattedMeshConfigs.filter(
    (mesh) => mesh.name !== "one-geometry" && mesh.name !== "zero-geometry"
  );

  const allowedBoundingBoxes: BoundingBox[] = [
    createBoundingBox({ x: 0, y: 0, z: -2 }, 4.2, 4.2, 2),
  ];
  const notAllowedBoundingBoxes: BoundingBox[] = [
    createBoundingBox({ x: 0, y: 0, z: -2 }, 2.2, 2.2, 15),
  ];
  const AMOUNT = 16;
  const coordinates = generateRandomlySpreadCoordinates(
    AMOUNT,
    allowedBoundingBoxes,
    notAllowedBoundingBoxes,
    1
  );
  const onesAndZeros = coordinates.map((coordinate, index) => {
    const nonRandomizedAxes = { y: true, x: true };
    const rotation = getRandomRotation(1, nonRandomizedAxes)[0];
    if (index % 2 === 1) {
      return {
        ...one,
        position: coordinate,
        name: "binary",
        rotation: { ...rotation, x: one.rotation.x },
      };
    }
    return {
      ...zero,
      position: coordinate,
      name: "binary",
      rotation: { ...rotation, x: zero.rotation.x },
    };
  });

  return [...filteredMeshConfigs, ...onesAndZeros];
};
