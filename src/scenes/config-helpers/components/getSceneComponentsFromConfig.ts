import { SceneComponentConfig } from "visual/components/interactive/scene/types";
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
  componentConfigs.flatMap(({ componentType, componentProps }) => {
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
          material,
          position,
        } = componentProps as TextProps;
        return TextComponent({
          name,
          text,
          fontUrl,
          material,
          position,
        });
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
        const { name, material, position, size } = componentProps as PlaneProps;
        return Plane({ name, position, size, material });
      }
      case COMPONENT_TYPES.CUBE: {
        const { name, material, position, size } = componentProps as CubeProps;
        return Cube({ name, position, size, material });
      }

      default:
        console.warn("component not set up for this component type");
        return [];
    }
  });
