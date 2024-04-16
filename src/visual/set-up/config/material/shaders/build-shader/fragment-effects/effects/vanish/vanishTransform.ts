import { shaderSafeFloat } from "visual/utils/conversion/shaderConversions";
import { VanishEffectProps } from "../../../buildShader.types";

export const vanishTransform = (
  fragName: string,
  previousFragName: string,
  vanishParameters: VanishEffectProps
) => {
  const { declareInTransform, numberOfRings, vanishHeight } = vanishParameters;
  const fragmentColorInstantiation = `vec4 ${fragName} = ${previousFragName};`;
  const transformation = `

        // VANISH
        ${declareInTransform ? fragmentColorInstantiation : ""}
        vec3 location = vec3(vPosition * uNoise * 32.0 + uTime);
        float pattern = simplePerlinNoise(location) * uDisplacement;
    
        float percent =  mod(uTime * 0.5, ${shaderSafeFloat(vanishHeight)});
        float target = percent - ${shaderSafeFloat(vanishHeight / 2)};
    
        float proximity = distance(vPosition.y * 0.7, target);
        float affected = clamp(0.23 * uSpread - proximity, 0.0, 1.0);
        vec3 distortion = pattern * vec3(affected);
    
        vec3 newPosition = vPosition + vNormal * distortion;
        float brightness = 100.0;
        if(length(distortion) > 0.05) {
            discard;
        }
        vec3 col = vec3(simplePerlinNoise(vec3(1.0 - newPosition.z * ${
          numberOfRings ? shaderSafeFloat(numberOfRings) : "uNumberOfRings"
        })) * 0.0)  * ${fragName}.xyz * brightness;
        ${fragName}  = vec4(${fragName}.xyz + clamp(col, vec3(0.0), vec3(1.0)), 1.0);
    
      `;
  return { fragmentColorInstantiation, transformation };
};
