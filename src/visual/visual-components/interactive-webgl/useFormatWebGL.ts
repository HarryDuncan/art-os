import { useCallback } from "react";
import { PlaneGeometry } from "three";
import { Asset } from "visual/hooks/use-assets/types";

import { WebGLShaderMaterialParams } from "./types";
import { defaultVertex } from "visual/shaders/vertex-shaders";
import { formatUniforms } from "visual/shaders/shader-functions/uniforms/formatUniforms";
import { formatFragmentShader } from "visual/shaders/shader-functions/formatFragmentShader";

export const useFormatWebGL = (
  initializedAssets: Asset[],
  areAssetsInitialized: boolean,
  materialParams: WebGLShaderMaterialParams
) => {
  const { shaderName, uniformDefinition } = materialParams;
  const { uniforms, uniformText } = formatUniforms();
  const fragmentShader = formatFragmentShader(shaderName, uniformText);
  const formatUniformsAndGeometry = useCallback(
    (assets: Asset[], unformattedUniforms): { geometry; uniforms; shaders } => {
      const geometry = new PlaneGeometry(2, 2);
      const shaders = {
        fragmentShader,
        vertexShader: defaultVertex,
      };
      return { geometry, uniforms: unformattedUniforms, shaders };
    },
    [fragmentShader]
  );
  return formatUniformsAndGeometry(initializedAssets, uniforms);
};
