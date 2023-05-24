import { SceneComponentConfig } from "visual/components/interactive-scene";
import { Mirror, TextComponent } from "visual/scene-elements/components";
import { Cube } from "visual/scene-elements/components/Cube";
import { Plane } from "visual/scene-elements/components/Plane";
import { SphericalBackground } from "visual/scene-elements/components/SphericalBackground";
import { MarchingCubes } from "visual/scene-elements/components/marching-cubes/MarchingCubes";
import {
  COMPONENT_TYPES,
  CubeProps,
  MarchingCubesProps,
  MirrorProps,
  PlaneProps,
  SphericalBackgroundProps,
  TextProps,
} from "visual/scene-elements/components/threeJsComponents.types";

export const getSceneComponents = (
  componentConfigs: SceneComponentConfig[] = []
) =>
  componentConfigs.flatMap(({ id, componentType, componentProps }) => {
    switch (componentType) {
      case COMPONENT_TYPES.MARCHING_CUBES: {
        const {
          parameters,
          material,
          position,
        } = componentProps as MarchingCubesProps;
        return MarchingCubes({ id, parameters, material, position });
      }
      case COMPONENT_TYPES.TEXT: {
        const {
          fontUrl,
          text,
          material,
          position,
        } = componentProps as TextProps;
        return TextComponent({
          id,
          text,
          fontUrl,
          material,
          position,
        });
      }
      case COMPONENT_TYPES.MIRROR: {
        const { geometry, position } = componentProps as MirrorProps;
        return Mirror({ id, geometry, position });
      }
      case COMPONENT_TYPES.SPHERICAL_BACKGROUND: {
        const {
          position,
          radius,
          rotation,
          material,
        } = componentProps as SphericalBackgroundProps;
        return SphericalBackground({
          id,
          position,
          radius,
          rotation,
          material,
        });
      }
      case COMPONENT_TYPES.PLANE: {
        const { material, position, size } = componentProps as PlaneProps;
        return Plane({ id, position, size, material });
      }
      case COMPONENT_TYPES.CUBE: {
        const { material, position, size } = componentProps as CubeProps;
        return Cube({ id, position, size, material });
      }

      default:
        console.warn("component not set up for this component type");
        return [];
    }
  });
