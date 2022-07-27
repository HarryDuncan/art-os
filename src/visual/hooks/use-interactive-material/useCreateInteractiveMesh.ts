import { useCallback } from 'react';
import { Mesh } from 'three';
import { InteractiveShader } from 'visual/components/interactive-shaders/interactive-shader';
import { Geometry } from 'types/threeJs.types';
import { InteractionEventObject } from '../use-interactions/types';
import {
  InteractiveMaterialFunctions,
  InteractiveShaders,
  InteractiveShaderTypes,
  InteractiveUniform,
} from '../../components/interactive-shaders/types';
import { InteractiveRawShader } from '../../components/interactive-shaders/interactive-raw-shader';

export const useCreateInteractiveMesh = (
  shaderType: InteractiveShaderTypes,
) => useCallback(
  (
    interactionEventObjects: InteractionEventObject[],
    geometry: Geometry,
    uniforms: InteractiveUniform,
    shaders: InteractiveShaders,
    materialFunctions: InteractiveMaterialFunctions,
  ) => {
    const interactiveMaterial = shaderType === InteractiveShaderTypes.RAW_SHADER
      ? new InteractiveRawShader(
        uniforms,
        shaders,
        interactionEventObjects,
        materialFunctions,
      )
      : new InteractiveShader(
        uniforms,
        shaders,
        interactionEventObjects,
        materialFunctions,
      );

    const interactiveMesh = new Mesh(geometry, interactiveMaterial);
    return interactiveMesh;
  },
  [shaderType],
);
