import { Color, Texture, Vector2, Vector3 } from "three";
import InteractiveMaterial from "visual/components/interactive-shaders/interactive-raw-shader/InteractiveRawShader";
import { FragmentShader, VertexShader } from "../../shaders/types";
import TouchTexture from "../../visual-components/interactive-particles/TouchTexture";
import PostProcessor from "../post-processor/PostProcessor";
import InteractiveShader from "./interactive-shader/InteractiveShader";
import InteractiveRawShader from "./interactive-raw-shader/InteractiveRawShader";

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

export enum InteractiveScenes {
  VANISHING_OBJECT = "vanishingObject",
  INTERACTIVE_PARTICLES = "interactiveParticles",
  INTERACTIVE_WEBGL = "interactiveWebGL",
  IMAGE_DISTORTION = "imageDistortion",
}

export enum InteractiveShaderTypes {
  RAW_SHADER = "rawShader",
  SHADER = "shader",
  NON_INTERACTIVE = "nonInteractive",
}
export type InteractiveShaders = VanishingObjectShaders;

export interface InteractiveParam {
  sceneType: InteractiveScenes;
  uniforms: InteractiveUniform | null;
  shaders: InteractiveShaders | null;
  postProcessor?: PostProcessor;
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
