import { useCamera } from "visual/hooks/use-camera/useCamera";
import { useScene } from "visual/hooks/use-scene/useScene";
import React, { useRef } from "react";
import { Clock, Color, Mesh, Vector3 } from "three";
import { RootContainer } from "../../components/root-container";
import { loadModel, loadObjModel } from "../../helpers/ModelLoader";
import loadTexture from "../../helpers/TextureLoader";
import ParticleSystem from "./class-components/ParticleSystem";
import PARAMS from "./magic-object-params";
import LokiMaterial from "./materials/loki-material/lokiMaterial";
import { ev, useEvents } from "visual/hooks/use-events/useEvents";
import { useInitializeNode } from "visual/hooks/use-initialize-node/useInitializeNode";
import { useController } from "visual/hooks/use-controller/useController";
import {
  EVENT_BIND_TYPES,
  POSENET_EVENTS,
  USER_EVENTS,
} from "visual/hooks/use-events/consts";
import { BindTypeKey, EventParam } from "visual/hooks/use-events/types";
import { usePoseNet } from "visual/hooks/use-pose-net/usePoseNet";
import { KEYPOINT_FEATURES } from "visual/hooks/use-pose-net/const";
import { KeypointFeatureKey } from "visual/hooks/use-pose-net/types";
import { useControlThread } from "visual/hooks/use-control-thread/use-control-thread";
import PostProcessing from "../../components/post-processing/PostProcessing";
import { useRenderer } from "visual/hooks/renderer";

export interface IMagicObjectStore {
  model?: any;
  texture?: any;
}

export const MagicObject = () => {
  // Set up ref, scene, and renderer, camera
  const container = useRef(null);
  const renderer = useRenderer();
  const scene = useScene();
  const camera = useCamera({ position: { x: 0, y: 30, z: 105 } });
  const { controller, updateController } = useController({});
  const currentFrameRef: React.MutableRefObject<number> = useRef(0);
  const postProcessor: React.MutableRefObject<null | PostProcessing> = useRef(
    null
  );
  const clock: Clock = new Clock();
  // EVENTS
  const leftWristMoveEvent = {
    bindType: EVENT_BIND_TYPES.DOCUMENT as BindTypeKey,
    key: POSENET_EVENTS.LEFT_WRIST,
  };

  const events: EventParam[] = [
    {
      bindType: EVENT_BIND_TYPES.DOCUMENT as BindTypeKey,
      key: USER_EVENTS.CLICK,
    },
    leftWristMoveEvent,
  ];

  useEvents({ events, props: { controller } });

  // POSENET
  const poseNetParams = {
    posenetIdentify: [
      {
        event: leftWristMoveEvent,
        featureKey: KEYPOINT_FEATURES.LEFT_WRIST as KeypointFeatureKey,
      },
    ],
  };
  const { posenetNode } = usePoseNet(poseNetParams);

  // THREAD CONTROL
  const update = () => {
    ev("scene:update");
    postProcessor.current?.render(clock.getDelta());

    // renderer.render(scene, camera);
    if (controller.isRunningThread) {
      currentFrameRef.current = requestAnimationFrame(update);
    }
  };
  const pause = () => {
    cancelAnimationFrame(currentFrameRef.current);
  };
  useControlThread(controller, update, pause);

  // SCENE SET UP
  const {
    progress,
    baseNoiseIteration,
    noiseDiffusion,
    mainColor,
    noisePrecision,
    lightningThickness,
    lightningPower,
    lightningDiffusion,
    vanishDirection,
  } = PARAMS;
  const store: IMagicObjectStore = {};
  const initialize = async () => {
    Promise.all([
      loadTexture("../assets//textures/obsidian.jpg"),
      loadObjModel("../assets/models/ZeusBust.obj"),
    ]).then((values) => {
      store.texture = values[0];
      //@ts-ignore
      console.log(values[1].children[0]);
      //@ts-ignore
      store.model = values[1].children[0];

      const material1 = new LokiMaterial({
        matcap: { value: store.texture },
        progress,
        baseNoiseIteration,
        noisePrecision,
        size: { value: new Vector3() },
        color: { value: new Color(mainColor) },
        noiseDiffusion,
        lightningThickness,
        lightningPower,
        lightningDiffusion,
        vanishDirection,
        time: { value: 0 },
        delta: { value: 0.01 },
      });

      // @ts-ignore
      const geom = store.model.geometry.clone();

      console.log(geom);
      geom.computeBoundingBox();

      const size = new Vector3();
      geom.boundingBox.getSize(size);

      const mesh = new Mesh(geom, material1);

      material1.uniforms.size.value.copy(size);

      const particles = new ParticleSystem(store);
      particles.init();
      scene.add(mesh, particles);

      postProcessor.current = new PostProcessing({ renderer, scene, camera });
      setTimeout(() => {
        updateController({
          ...controller,
          isInitialized: true,
          isRunningThread: true,
        });
      }, 1000);
    });
  };
  useInitializeNode(container, renderer, initialize);

  return (
    <>
      {posenetNode}
      <RootContainer containerRef={container} />
    </>
  );
};
