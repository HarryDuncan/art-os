import { Color, Texture, Vector2, Vector3 } from "three";
import InteractiveShader from "./interactive-shader/InteractiveShader";
import InteractiveRawShader from "./interactive-raw-shader/InteractiveRawShader";
import { FragmentShader, VertexShader } from "visual/shaders/shaders.types";
import { INTERACTIVE_SHADER_TYPES } from "./shaders.constants";

export interface VanishingObjectUniforms {
  matcap: { value: Texture | null };
  progress: { value: number };
  size: { value: Vector3 };
  color: { value: Color };
  baseNoiseIteration: { value: number };
  noisePrecision: { value: number };
  noiseDiffusion: { value: number };
  lightningThickness: { value: number };
  lightningPower: { value: number };
  lightningDiffusion: { value: number };
  particleDiffusion: { value: 1 };
  vanishDirection: { value: Vector2 };
  time: { value: number };
  delta: { value: number };
}

export interface VanishingObjectShaders {
  fragmentShader: FragmentShader;
  vertexShader: VertexShader;
}

export type InteractiveUniform =
  | VanishingObjectUniforms
  | InteractiveParticlesUniforms
  | Record<string, unknown>;

export type InteractiveShaders = VanishingObjectShaders;

export interface InteractiveMaterialFunctions {
  onTimeUpdate: (material: InteractiveShaderMaterial) => void;
}

export interface InteractiveParticlesUniforms {
  uTime: { value: number };
  uRandom: { value: number };
  uDepth: { value: number };
  uSize: { value: number };
  uTextureSize: { value: Vector2 };
  uTexture: { value: null | Texture };
  uTouch: { value: null | Texture };
  //  uTouchRef: { value: null | TouchTexture };
}

export type InteractiveShaderMaterial =
  | InteractiveRawShader
  | InteractiveShader;

export type InteractiveShaderType = keyof typeof INTERACTIVE_SHADER_TYPES;
