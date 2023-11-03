import { ShaderFunction } from "../buildShader.types";
import { UniformConfig } from "../shader-properties/uniforms/uniforms.types";

export interface RequiredFunctionData {
  functionId: string;
  functionText: string;
}
export interface VertexEffectData {
  requiredFunctions: ShaderFunction[];
  uniformConfig: UniformConfig;
  varyingConfig;
  transformation;
  pointName: string;
}
