import { useMemo } from "react";
import { SceneComponentConfig } from "visual/components/interactive/scene/types";
import {
  MarchingCubes,
  Mirror,
} from "visual/components/three-js-components/components";
import { Cube } from "visual/components/three-js-components/components/Cube";
import { Plane } from "visual/components/three-js-components/components/Plane";
import { SphericalBackground } from "visual/components/three-js-components/components/SphericalBackground";
import { Text } from "visual/components/three-js-components/components/Text";
import {
  COMPONENT_TYPES,
  CubeProps,
  MarchingCubesProps,
  MirrorProps,
  PlaneProps,
  SphericalBackgroundProps,
  TextProps,
} from "visual/components/three-js-components/components/threeJsComponents.types";

export const useSceneComponents = (
  componentConfigs: SceneComponentConfig[] = []
) =>
  useMemo(() => {
    return componentConfigs.flatMap(({ componentType, componentProps }) => {
      switch (componentType) {
        case COMPONENT_TYPES.MARCHING_CUBES: {
          const {
            name,
            parameters,
            material,
            position,
          } = componentProps as MarchingCubesProps;
          return MarchingCubes({ name, parameters, material, position });
        }
        case COMPONENT_TYPES.TEXT: {
          const {
            name,
            fontUrl,
            text,
            materialProps,
            position,
          } = componentProps as TextProps;
          return Text({ name, text, fontUrl, materialProps, position });
        }
        case COMPONENT_TYPES.MIRROR: {
          const { name, geometry, position } = componentProps as MirrorProps;
          return Mirror({ name, geometry, position });
        }
        case COMPONENT_TYPES.SPHERICAL_BACKGROUND: {
          const {
            name,
            position,
            radius,
            rotation,
            material,
          } = componentProps as SphericalBackgroundProps;
          return SphericalBackground({
            name,
            position,
            radius,
            rotation,
            material,
          });
        }
        case COMPONENT_TYPES.PLANE: {
          const {
            name,
            material,
            position,
            size,
          } = componentProps as PlaneProps;
          return Plane({ name, position, size, material });
        }
        case COMPONENT_TYPES.CUBE:
          const {
            name,
            material,
            position,
            size,
          } = componentProps as CubeProps;
          return Cube({ name, position, size, material });
        default:
          console.warn("component not set up for this component type");
          return [];
      }
    });
  }, [componentConfigs]);
