import { UniformTypes } from "visual/shaders/types";

export const materialParams = {
  shaderName: "deepWavesFrag",
  uniformDefinition: [
    { uniformName: "uPosition", uniformType: UniformTypes.Vec2 },
    { uniformName: "uColor", uniformType: UniformTypes.Float },
  ],
};
