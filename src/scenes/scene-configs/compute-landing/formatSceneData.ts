import { SceneData } from "visual/components/interactive";
import { getMeshConfigs } from "scenes/config-helpers/mesh/getMeshConfigs";
import { getRandomRotation } from "visual/helpers/getRandomRotation";
import { createBoundingBox } from "visual/helpers/three-dimension-space/createBoundingBox";
import { generateRandomlySpreadCoordinates } from "visual/helpers/three-dimension-space/position/getRandomlySpreadCoordinates";
import { BoundingBox } from "visual/helpers/three-dimension-space/position/position.types";
import { getLightsFromConfig } from "scenes/config-helpers/lights/getLightsFromConfig";
import computeConfig from "./config.json";
import { SceneDataConfig } from "scenes/config-helpers/config.types";
import { formatGlobalMaterials } from "scenes/config-helpers/material/formatGlobalMaterials";
import { CONFIG_INDEX } from "../constants";
import { formatSceneComponentConfigs } from "scenes/config-helpers/components/formatSceneComponentConfigs";

export const formatSceneData = (assets, context, dispatch): SceneData => {
  const config = computeConfig[CONFIG_INDEX] as SceneDataConfig;
  const materials = formatGlobalMaterials(assets, config);
  const meshConfigs = getMeshConfigs(assets, materials, config);
  const formattedMeshConfigs = setUpMeshConfigs(meshConfigs);
  const lights = getLightsFromConfig(config);
  const sceneComponents = formatSceneComponentConfigs(config, materials);
  console.log(sceneComponents);
  return {
    isSceneDataInitialized: true,
    meshConfigs: formattedMeshConfigs,
    sceneComponents,
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
