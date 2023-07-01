import {
  TextComponent,
  Mirror,
  MarchingCubesElement,
} from "visual/display/scene-elements/components";
import { Cube } from "visual/display/scene-elements/components/Cube";
import { SphericalBackground } from "visual/display/scene-elements/components/SphericalBackground";
import {
  COMPONENT_TYPES,
  MarchingCubesProps,
  TextProps,
  MirrorProps,
  SphericalBackgroundProps,
  PlaneProps,
  CubeProps,
} from "visual/display/scene-elements/components/threeJsComponents.types";
import { PlaneElement } from "visual/display/scene-elements/components/PlaneElement";
import { SceneComponentConfig } from "../config.types";

export const getSceneComponents = (
  componentConfigs: SceneComponentConfig[] = []
) =>
  componentConfigs.flatMap(({ id, componentType, componentProps }) => {
    switch (componentType) {
      case COMPONENT_TYPES.MARCHING_CUBES: {
        const {
          resolution,
          material,
          position,
        } = componentProps as MarchingCubesProps;
        return MarchingCubesElement({ id, resolution, material, position });
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
        return PlaneElement({ id, position, size, material });
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
