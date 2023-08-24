import { DISPLACEMENT_TYPES } from "../buildShader.constants";
import { VertexEffect } from "../buildShader.types";
import { explode } from "./displacement/explode";

export const setUpVertexEffects = (vertexEffects: VertexEffect[]) => {
  const requiredFunctions = getRequiredFunctions(vertexEffects);
  const { uniformSchema, transformationStrings, transformPoint } =
    getVertexTransformations(vertexEffects);
  const viewMatrix = `gl_Position = projectionMatrix * modelViewMatrix * ${transformPoint};`;

  return {
    requiredFunctions,
    transformationStrings,
    uniformSchema,
    viewMatrix,
  };
};

const getRequiredFunctions = (vertexEffects: VertexEffect[]) => {
  const functions = vertexEffects.flatMap(({ effectType }) => {
    switch (effectType) {
      case DISPLACEMENT_TYPES.EXPLODE:
      case DISPLACEMENT_TYPES.IMPLODE:
        return [];
      default:
        console.warn(`no functions configured for ${effectType}`);
        return [];
    }
  });
  return functions;
};

const getVertexTransformations = (vertexEffects: VertexEffect[]) => {
  let transformPoint = "position";
  const uniformSchemas: unknown[] = [];
  const transformations: string[] = [];
  vertexEffects.forEach((effect) => {
    switch (effect.effectType) {
      case DISPLACEMENT_TYPES.EXPLODE: {
        const { uniforms, transformation, pointName } = explode(transformPoint);
        transformPoint = pointName;
        uniformSchemas.push(uniforms);
        transformations.push(transformation);
        break;
      }
      default:
        console.warn(
          `no vertex transformations configured for ${effect.effectType}`
        );
    }
  });

  const uniformSchema = uniformSchemas.reduce((mergedObj, obj) => {
    mergedObj[obj.key] = obj.value;
    return mergedObj;
  }, {});

  const transformationStrings = transformations.join("");
  return { uniformSchema, transformationStrings, transformPoint };
};
