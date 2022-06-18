import { Color, Texture, Vector2, Vector3 } from "three";
import {
  FragmentShader,
  VertexShader,
} from "../use-webgl-shader/fragmentShaders/types";

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
export type InteractiveUniform = VanishingObjectUniforms;
export enum InteractiveScenes {
  VANISHING_OBJECT = "vanishingObject",
}
export type InteractiveShaders = VanishingObjectShaders;

export interface InteractiveParam {
  sceneType: InteractiveScenes;
  uniforms: InteractiveUniform | null;
  shaders: InteractiveShaders | null;
  postProcessor?: any;
}
