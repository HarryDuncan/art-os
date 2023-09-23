import { generateRandomlySpreadCoordinates } from "visual/utils/three-dimension-space/position/getRandomlySpreadCoordinates";
import { MeshComponentConfig } from "../../config.types";
import { createBoundingBox } from "visual/utils/three-dimension-space/createBoundingBox";
import { getRandomRotationAsDegrees } from "visual/utils/randomize/getRandomRotation";

export const setUpRandomizedMeshConfigs = (
  meshComponentConfigs: MeshComponentConfig[]
): MeshComponentConfig[] => {
  if (!meshComponentConfigs) {
    return [];
  }

  const randomizedMeshes = meshComponentConfigs.flatMap((meshConfig) => {
    return meshConfig.randomizationConfig ? meshConfig : [];
  });

  return randomizedMeshes.flatMap((meshConfig) => {
    return setUpRandom(meshConfig);
  });
};

const setUpRandom = (meshConfig: MeshComponentConfig) => {
  const { randomizationConfig } = meshConfig;
  if (!randomizationConfig) {
    return [];
  }
  const { instanceCount, boundingBoxConfig } = randomizationConfig;
  const boundingBox = createBoundingBox(boundingBoxConfig);
  const randomCoordinates = generateRandomlySpreadCoordinates(
    instanceCount,
    [boundingBox],
    [],
    2
  );
  const formattedMeshConfig = randomCoordinates.map((coordinate, index) => {
    const rotation = getRandomRotationAsDegrees();
    return {
      ...meshConfig,
      id: `${meshConfig.id}-${index}`,
      position: coordinate,
      rotation,
    };
  });
  return formattedMeshConfig;
};
