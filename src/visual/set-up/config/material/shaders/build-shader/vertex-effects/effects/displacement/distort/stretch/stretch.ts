import { Vector3 } from "three";
import { ShaderPropertyValueTypes } from "../../../../../constants";
import { UniformConfig } from "../../../../../types";

export const stretch = (pointName, previousPointName, effectProps) => {
  const uniformConfig = {
    defaultUniforms: [],
    customUniforms: [
      {
        id: "uStretchPoints",
        valueType: ShaderPropertyValueTypes.VEC3,
        arrayLength: 2,
        arrayValue: [new Vector3(0, 0, 0), new Vector3(0, 0, 0)],
      },
      {
        id: "uCenter",
        valueType: ShaderPropertyValueTypes.VEC3,
        value: new Vector3(0, 0, 0),
      },
    ],
  } as UniformConfig;

  const transformation = `
   
    vec3 stretchPoint1 = uStretchPoints[0];
    vec3 stretchPoint2 = uStretchPoints[1];
    // get the distance from position to uStrechPoints 1 and 2
    vec3 center = uCenter;

    // Calculate distance from the vertex position to the center and stretch points
    float distFromCenter = distance(position, center);
    float distFromStretch1 = distance(position, stretchPoint1);
    float distFromStretch2 = distance(position, stretchPoint2);

    // Linearly interpolate stretch factor based on the distance
    float stretchFactor = mix(1.0, 2.0, distFromCenter / min(distFromStretch1, distFromStretch2));
     vec3 selectedPosition = stretchPoint1;
    if(min(distFromStretch1, distFromStretch2) == distFromStretch2){
      selectedPosition = stretchPoint2;
    }
 
    // Apply the stretch transformation
    vec3 stretchedPosition = mix(position, selectedPosition,  stretchFactor);

    // Assign the transformed position
    vec4 ${pointName} = vec4(stretchedPosition, 1.0);
    vec4 twistedNormal = vec4( normal, 1.0 );`;
  return {
    transformation,
    uniformConfig,
    pointName,
  };
};
