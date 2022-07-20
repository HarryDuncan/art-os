import { Vector3 } from "three";
import { UniformDefinition, UniformTypes } from "visual/shaders/types";

export const formatUniforms = (uniformParams: UniformDefinition[] = []) => {
  const defaultUniforms = [
    { uniformName: "uTime", uniformType: UniformTypes.Float },
    { uniformName: "uResolution", uniformType: UniformTypes.Vec3, type: "v3" },
  ];
  const definitions: UniformDefinition[] = uniformParams.concat(
    defaultUniforms
  );

  const uniforms: any = {};
  let uniformDeclarationText = ``;

  definitions.forEach(({ uniformName, uniformType, value, type }) => {
    const uniformValue = {
      value: value ? value : getDefaultValue(uniformType),
    };
    if (type) {
      uniformValue["type"] = type;
    }
    uniforms[uniformName] = uniformValue;
    uniformDeclarationText += `uniform ${uniformType} ${uniformName};
    `;
  });

  if (uniforms.uResolution) {
    uniforms.uResolution.value.x = window.innerWidth;
    uniforms.uResolution.value.y = window.innerHeight;
  }

  return { uniforms, uniformText: uniformDeclarationText };
};

const getDefaultValue = (uniformType: UniformTypes) => {
  switch (uniformType) {
    case UniformTypes.Float:
      return 0.0;
    case UniformTypes.Vec3:
      return new Vector3();
    default:
      return null;
  }
};
