import {
  AttributeConfig,
  ShaderFunction,
  UniformConfig,
} from "../buildShader.types";

export interface RequiredFunctionData {
  functionId: string;
  functionText: string;
}
export interface VertexEffectData {
  requiredFunctions: ShaderFunction[];
  uniformConfig: UniformConfig;
  varyingConfig;
  transformation: string;
  pointName: string;
  attributeConfig?: AttributeConfig[];
}
