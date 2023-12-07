import { PositionConfig } from "visual/utils/three-dimension-space/position/position.types";
import { shaderSafeVector } from "visual/utils/conversion/shaderConversions";
import { vertexTranslate } from "visual/display/materials/webgl-shaders/shader-functions/translation/translate";
import {
  capitalizeFirstLetter,
  lowerCaseFirstLetter,
} from "visual/utils/strings/stringUtils";
import { TransformTypes } from "../../../vertexEffects.consts";
import {
  PreTransformConfig,
  PreTransformData,
  TranslateTransformProps,
} from "../../../../buildShader.types";

export const preTransforms = (
  preTransformedItems: PreTransformConfig[]
): PreTransformData[] =>
  preTransformedItems.flatMap(
    ({ index, pointName, transformType, transformProps }) => {
      const appendedPoint = capitalizeFirstLetter(pointName);
      switch (transformType) {
        case TransformTypes.TRANSLATE: {
          const originalPointName = `${lowerCaseFirstLetter(
            pointName
          )}${index}`;
          const positionName = `transform${appendedPoint}${index}`;
          const normalName = `transform${appendedPoint}${index}`;
          const { translate } = transformProps as TranslateTransformProps;
          const transform = getTranslateTransform(
            positionName,
            originalPointName,
            translate
          );
          const requiredFunctions = [
            { id: "translate", functionDefinition: vertexTranslate },
          ];

          return {
            transform,
            requiredFunctions,
            positionName,
            normalName,
            index,
          };
        }
        default:
          console.warn(`no pre transform configured for ${transformType}`);
          return [];
      }
    }
  );

const getTranslateTransform = (
  positionName: string,
  pointName: string,
  translate: PositionConfig
) => {
  return `vec3 translateVector = ${shaderSafeVector(translate)};
vec3 ${positionName} = translateVertex(translateVector, ${pointName}.xyz);
  `;
};
