import { DataTexture, Texture, Vector4 } from "three";
import {
  InteractiveMaterialFunctions,
  InteractiveScenes,
  InteractiveShaders,
} from "visual/components/interactive-shaders/types";
import { Asset } from "visual/hooks/use-assets/types";
import { InteractionEventObject } from "visual/hooks/use-interactions/types";
import { ThreeJsParams } from "visual/hooks/use-three-js/types";

export interface ImageDistortionParams {
  threeJsParams: ThreeJsParams;
  interactionEvents: InteractionEventObject[];
  assets: Asset[];
  materialParams: ImageDistortionMaterialParam;
  materialFunctions: InteractiveMaterialFunctions;
}

export interface ImageDistortionMaterialParam {
  sceneType: InteractiveScenes;
  uniforms: ImageDistortionUniforms;
  shaders: InteractiveShaders | null;
}

interface ImageDistortionUniforms {
  uTime: { value: number };
  uResolution: { value: Vector4 };
  uTexture: { value: null | Texture };
  uDataTexture: {
    value: null | DataTexture;
  };
}
