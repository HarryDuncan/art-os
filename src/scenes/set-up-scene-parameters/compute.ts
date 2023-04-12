import { CustomAnimationConfig } from "visual/animation/animation.types";
import { formatSceneData } from "./formatSceneData";
import { startSceneElementAnimations } from "visual/animation/animation-manager/startSceneElementAnimations";
import { formatInteractionEvents } from "./formatInteractionEvents";
import {
  InteractiveScene,
  SceneData,
} from "visual/components/interactive-scene";
import { getMeshByName } from "visual/helpers/scene/object-finding/getMeshByName";
import { RawShaderMaterial } from "three";
import { InteractionEventConfig } from "interaction-node/interactions.types";
import { EVENT_BINDING_TYPE } from "interaction-node/interactions.constants";
import { TextureLoader } from "three";
import { eulerToDegrees } from "visual/helpers/conversion/euelerToDegrees";

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
      camera: { position: { x: 0, y: 0, z: 70 } },
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
    material.uniforms.uRotation.value = mesh.rotation.y;
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
      mesh.material.uniforms.uTouchRef.value = interactionComponents[0];
      // @ts-ignore
      mesh.material.uniforms.uTouch.value = interactionComponents[0].texture;
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
