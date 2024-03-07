import { AdvancedScene, Asset } from "visual/set-up/assets/asset.types";
import { AdvancedMeshConfig } from "./advancedMesh.types";
import { formatMeshTransforms } from "../geometry/formatMeshTransforms";
import { MeshTransformConfig } from "../../config.types";
import { Material } from "three";
import { ShaderAttributeConfig } from "../../material/shaders/build-shader/buildShader.types";
import { transformGeometry } from "../geometry/transform-geometries/transformGeometries";
import { addMaterials } from "../mesh-materials/addMaterials";
import {
  formatPositionFromConfig,
  formatRotationFromConfig,
} from "visual/utils/three-dimension-space/formatFromConfig";
import { clone } from "three/examples/jsm/utils/SkeletonUtils";

export const setUpAdvancedMeshes = (
  assets: Asset[],
  meshConfigs: AdvancedMeshConfig[] = [],
  materials: Material[],
  meshTransforms: MeshTransformConfig[] = [],
  attributeConfigs: ShaderAttributeConfig[]
) =>
  meshConfigs.map((meshConfig) => {
    const selectedAsset = assets.find(
      (asset) => asset.id === meshConfig.assetId
    );
    if (selectedAsset) {
      const { data } = selectedAsset;
      const { scene, animations } = data as AdvancedScene;

      // format any geometry data to mesh config while still being part of group

      const formattedScene = formatScene(scene, meshConfig);
      formattedScene.animations = animations;
      loopThroughAllChildren(
        formattedScene,
        materials,
        meshTransforms,
        attributeConfigs,
        [meshConfig]
      );
      formattedScene.name = meshConfig.id;

      return formattedScene;
    }
  });

const loopThroughAllChildren = (
  data,
  materials,
  meshTransforms,
  attributeConfigs,
  meshComponentConfigs
) => {
  const { children } = data;
  children.forEach((child) => {
    if (child.idGroup || child.children.length > 0) {
      loopThroughAllChildren(
        child,
        materials,
        meshTransforms,
        attributeConfigs,
        meshComponentConfigs
      );
    }
    if (child.isMesh) {
      // add any material data to mesh
      const formattedTransforms = formatMeshTransforms(
        meshTransforms ?? [],
        attributeConfigs
      );

      const s = materials[0];
      child.material = s;
      // return group
    }
  });
};

const formatScene = (scene, meshConfig) => {
  const clonedScene = clone(scene);
  const position = formatPositionFromConfig(meshConfig);
  const rotation = formatRotationFromConfig(meshConfig);
  clonedScene.position.set(position.x, position.y, position.z);
  clonedScene.rotation.set(rotation.x, rotation.y, rotation.z);
  const scale = meshConfig.geometryConfig.scale;
  clonedScene.scale.set(scale, scale, scale);
  return clonedScene;
};
