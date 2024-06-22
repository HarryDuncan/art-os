import { createColorVectorString } from "../../../../../helpers/createColorVectorString";
import { PointTexture } from "../../../../../types";

export const getPointTexture = (
  fragName: string,
  pointTextures: PointTexture[]
) => {
  const increment = 1 / pointTextures.length;
  return pointTextures
    .map(({ id, pointColor }, index) => {
      const lowerBound = (index * increment).toFixed(1);
      const upperBound = ((index + 1) * increment).toFixed(1);
      return `if(vPointType > ${lowerBound} && vPointType < ${
        upperBound === "1.0" ? "1.1" : upperBound
      }){
              ${fragName} = ${createColorVectorString(
        pointColor,
        true
      )} * texture2D(${id}, gl_PointCoord);
          } \n `;
    })
    .join(" \n ");
};
