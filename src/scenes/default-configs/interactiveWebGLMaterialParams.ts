import { UniformTypes } from "visual/shaders/shaders.types";

export const deepWavesMaterialParams = {
  shaderName: "deepWavesFrag",
  uniformDefinition: [
    { uniformName: "uPosition", uniformType: UniformTypes.Vec2 },
    { uniformName: "uColor", uniformType: UniformTypes.Float },
  ],
};
export const getShaderParams = (shaderName) => ({
  shaderName,
  uniformDefinition: [
    { uniformName: "uPosition", uniformType: UniformTypes.Vec3 },
  ],
});
