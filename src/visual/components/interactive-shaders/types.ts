import { Color, Texture, Vector2, Vector3 } from "three";
import InteractiveMaterial from "visual/components/interactive-shaders/interactive-raw-shader/InteractiveRawShader";
import { FragmentShader, VertexShader } from "../../shaders/types";
import TouchTexture from "../../visual-components/interactive-particles/TouchTexture";
import InteractiveShader from "./interactive-shader/InteractiveShader";
import InteractiveRawShader from "./interactive-shader/InteractiveShader";

export interface VanishingObjectUniforms {
  matcap: { value: Texture | null };
  progress: { value: Number };
  size: { value: Vector3 };
  color: { value: Color };
  baseNoiseIteration: { value: Number };
  noisePrecision: { value: Number };
  noiseDiffusion: { value: Number };
  lightningThickness: { value: Number };
  lightningPower: { value: Number };
  lightningDiffusion: { value: Number };
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
  | InteractiveParticlesUniforms;

export enum InteractiveScenes {
  VANISHING_OBJECT = "vanishingObject",
  INTERACTIVE_PARTICLES = "interactiveParticles",
  INTERACTIVE_WEBGL = "interactiveWebGL",
  IMAGE_DISTORTION = "imageDistortion",
}

export enum InteractiveShaderTypes {
  RAW_SHADER = "rawShader",
  SHADER = "shader",
}
export type InteractiveShaders = VanishingObjectShaders;

export interface InteractiveParam {
  sceneType: InteractiveScenes;
  uniforms: InteractiveUniform | null;
  shaders: InteractiveShaders | null;
  postProcessor?: any;
}

export interface InteractiveMaterialFunctions {
  onTimeUpdate: (material: InteractiveMaterial) => void;
}

export interface InteractiveParticlesUniforms {
  uTime: { value: number };
  uRandom: { value: number };
  uDepth: { value: number };
  uSize: { value: number };
  uTextureSize: { value: Vector2 };
  uTexture: { value: null | Texture };
  uTouch: { value: null | Texture };
  uTouchRef: { value: null | TouchTexture };
}

export type InteractiveShaderMaterial =
  | InteractiveRawShader
  | InteractiveShader;
