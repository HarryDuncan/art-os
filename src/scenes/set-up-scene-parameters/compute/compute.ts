import { CustomAnimationConfig } from "visual/display/animation/animation.types";
import { formatSceneData } from "../formatSceneData";
import { startSceneElementAnimations } from "visual/display/animation/animation-manager/startSceneElementAnimations";
import { formatInteractionEvents } from "./formatInteractionEvents";
import {
  InteractiveScene,
  SceneData,
} from "visual/display/components/interactive-scene";
import { getMeshByName } from "visual/display/helpers/scene/object-finding/getMeshByName";
import { RawShaderMaterial, TextureLoader } from "three";
import { InteractionEventConfig } from "interaction-node/interactions.types";
import { EVENT_BINDING_TYPE } from "interaction-node/interactions.constants";

import { getCalculationWeightingForQuadrant } from "visual/display/utils/getQuadrant";

export const compute = (config, assets) => {
  const { animationConfig, interactionConfig } = config;
  const interactionEvents = formatInteractionEvents(interactionConfig);
  const sceneData = formatSceneData(config, assets);
  addInteractionEventsToSceneData(
    sceneData,
    interactionEvents,
    sceneData.interactionComponents,
    assets
  );
  return {
    threeJsParams: {
      camera: { position: { x: 0, y: -1, z: 25 } },
      controls: {
        hasOrbitControls: true,
      },
    },
    sceneFunctions: {
      onTimeUpdate: (scene: InteractiveScene) => {
        startSceneElementAnimations(scene);
        updateRotationUniform(scene, "nymph");
      },
    },
    interactionEvents,
    sceneData,
    animations: animationConfig as CustomAnimationConfig[],
    events: [],
  };
};

const updateRotationUniform = (scene: InteractiveScene, meshId) => {
  const mesh = getMeshByName(scene, meshId);
  if (mesh) {
    const material = mesh.material as RawShaderMaterial;
    // @ts-ignore
    if (mesh.material.clock) {
      // @ts-ignore
      material.uniforms.uTime.value += mesh.material.clock.getDelta();
      material.uniforms.uEffectTranslation.value = getCalculationWeightingForQuadrant(
        mesh.rotation.y
      );
    }
  }
};

const addInteractionEventsToSceneData = (
  sceneData: SceneData,
  interactionEvents: InteractionEventConfig[],
  interactionComponents: any,
  assets
) => {
  const materialEvents = interactionEvents.filter(
    (interactionEvent) =>
      interactionEvent.bindingType === EVENT_BINDING_TYPE.MATERIAL
  );
  if (!materialEvents.length) return;
  sceneData.meshes?.forEach((mesh) => {
    if (mesh.name === "nymph") {
      // @ts-ignore
      mesh.material.addInteractionsEvents(materialEvents);

      // @ts-ignore
      mesh.material.uniforms.uTextureOne.value = new TextureLoader().load(
        "../assets/textures/compute/1.png"
      );
      // @ts-ignore
      mesh.material.uniforms.uTextureZero.value = new TextureLoader().load(
        "../assets/textures/compute/0.png"
      );
    }
  });
};
