import {
  AttributeConfig,
  ShaderFunction,
  UniformConfig,
  VaryingConfig,
} from "../buildShader.types";

export interface VertexEffectData {
  requiredFunctions: ShaderFunction[];
  uniformConfig: UniformConfig;
  varyingConfig: VaryingConfig[];
  transformation: string;
  pointName: string;
  attributeConfig: AttributeConfig[];
  vertexPointInstantiation?: string;
}

export type MorphObject = {
  pointName: string;
  normalName: string;
};
