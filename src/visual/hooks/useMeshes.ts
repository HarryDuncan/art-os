import { useMemo } from "react";
import {
  AdditiveBlending,
  DoubleSide,
  Material,
  Mesh,
  Points,
  ShaderMaterial,
} from "three";
import InteractiveRawShader from "visual/components/interactive-shaders/interactive-raw-shader/InteractiveRawShader";
import { InteractiveShader } from "visual/components/interactive-shaders/interactive-shader";
import { InteractiveShaderTypes } from "visual/components/interactive-shaders/types";
import {
  FormattedGeometry,
  FormattedGeometryType,
  InteractiveMaterialParameters,
} from "visual/helpers/geometry/three-geometry/types";

export const useMeshes = (geometries: FormattedGeometry[] = []) =>
  useMemo(() => {
    if (!geometries.length) return [];
    return geometries.flatMap(
      ({ geometry, geometryType, materialParameters }) => {
        switch (geometryType) {
          case FormattedGeometryType.interactive: {
            const interactiveMaterial = getInteractiveMaterial(
              materialParameters as InteractiveMaterialParameters
            );
            return new Points(geometry, interactiveMaterial);
          }

          case FormattedGeometryType.standard:
            return new Mesh(geometry, materialParameters as Material);
          default:
            return [];
        }
      }
    );
  }, [geometries]);

const getInteractiveMaterial = (
  materialParams: InteractiveMaterialParameters
) => {
  const {
    shaderType,
    shaders,
    uniforms,
  } = materialParams as InteractiveMaterialParameters;
  if (shaderType === InteractiveShaderTypes.RAW_SHADER) {
    return new InteractiveRawShader(uniforms, shaders, []);
  }
  return new ShaderMaterial({
    side: DoubleSide,
    // @ts-ignore
    uniforms,
    // wireframe: true,
    // transparent: true,
    blending: AdditiveBlending,
    vertexShader: shaders.vertexShader.vert,
    fragmentShader: shaders.fragmentShader.frag,
    depthTest: false,
    depthWrite: false,
  });
};
