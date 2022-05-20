import { useCamera } from "visual/hooks/use-camera/useCamera";
import { useScene } from "visual/hooks/use-scene/useScene";
import React, { useEffect, useRef, useState } from "react";
import { ev } from "visual/hooks/use-events/useEvents";
import { useInitializeNode } from "visual/hooks/use-initialize-node/useInitializeNode";
import { useController } from "visual/hooks/use-controller/useController";
import { useControlThread } from "visual/hooks/use-control-thread/use-control-thread";
import { useRenderer } from "visual/hooks/renderer";
import { getRatio } from "./utils";
import {
  Clock,
  Mesh,
  PlaneBufferGeometry,
  ShaderMaterial,
  Vector2,
} from "three";
import { vertexShader } from "./shaders/vertexShader";
import { gooeyFragShader } from "./shaders/gooeyShader";
import { RootContainer } from "visual/components/root-container";
import { ImageTile } from "./Tile.styles";

export interface IGooeyImageStore {
  model?: any;
  texture?: any;
}

let sizes = new Vector2(0, 0);
let offset = new Vector2(0, 0);
const clock = new Clock();

let mouse = { x: 0, y: 0 };

const uniforms = {
  u_alpha: { value: 1 },
  u_progressHover: { value: 0 },
  u_progressClick: { value: 0 },
  u_time: { value: clock.getElapsedTime() },
  u_res: {
    value: new Vector2(window.innerWidth, window.innerHeight),
  },
};
export const GooeyImage = () => {
  // Set up ref, scene, and renderer, camera
  const imageRef = useRef(null);
  const container = useRef(null);
  const renderer = useRenderer();
  const scene = useScene();
  const camera = useCamera({ position: { x: 0, y: 0, z: 0 } });
  const { controller, updateController, onSceneInitialized } = useController(
    {}
  );
  const currentFrameRef: React.MutableRefObject<number> = useRef(0);

  // THREAD CONTROL
  const update = () => {
    // ev("scene:update");
    renderer.render(scene, camera);
    uniforms.u_time.value += clock.getDelta();

    if (controller.isRunningThread) {
      currentFrameRef.current = requestAnimationFrame(update);
    }
  };
  const pause = () => {
    cancelAnimationFrame(currentFrameRef.current);
  };
  useControlThread(controller, update, pause);

  const imageSource = "../assets/tiles/woods/base.jpg";
  const hoverImg = "../assets/tiles/woods/hover.jpg";

  const getBounds = () => {
    if (imageRef.current !== null) {
      const {
        width,
        height,
        left,
        top,
        //@ts-ignore
      } = imageRef.current.getBoundingClientRect();

      if (!sizes.equals(new Vector2(width, height))) {
        sizes.set(width, height);
      }

      if (
        !offset.equals(
          new Vector2(
            left - window.innerWidth / 2 + width / 2,
            -top + window.innerHeight / 2 - height / 2
          )
        )
      ) {
        offset.set(
          left - window.innerWidth / 2 + width / 2,
          -top + window.innerHeight / 2 - height / 2
        );
      }
    }
  };

  const updateHover = () => {
    console.log(uniforms);
    if (uniforms["u_mouse"]) {
      uniforms["u_mouse"].value = mouse;
    }
  };

  const initialize = async () => {
    console.log(imageRef);
    const texture = imageSource;
    const hoverTexture = hoverImg;
    getBounds();
    uniforms["u_map"] = { type: "t", value: texture };
    // @ts-ignore
    uniforms["u_ratio"] = { value: getRatio(sizes, imageRef.current) };
    uniforms["u_hoverMap"] = { type: "t", value: hoverTexture };
    uniforms["u_mouse"] = { value: mouse };
    //@ts-ignore
    uniforms["u_hoverratio"] = { value: getRatio(sizes, imageRef.current) };

    const geometry = new PlaneBufferGeometry(1, 1, 1, 1);

    const material = new ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertexShader,
      fragmentShader: gooeyFragShader,
      transparent: true,
      defines: {
        PI: Math.PI,
        PR: window.devicePixelRatio.toFixed(1),
      },
    });

    const mesh = new Mesh(geometry, material);

    mesh.position.x = offset.x;
    mesh.position.y = offset.y;

    mesh.scale.set(sizes.x, sizes.y, 1);

    scene.add(mesh);
    renderer.render(scene, camera);
    console.log("done");
    onSceneInitialized();
  };
  useInitializeNode(container, renderer, initialize);

  const [isHovering, setIsHovering] = useState<boolean>();
  // Events
  const onImageMouseEnter = (e) => {};

  const onImageMouseLeave = () => {};

  const onMouseMove = (event) => {
    const { clientX, clientY } = event;
    mouse.x = clientX;
    mouse.y = clientY;
    updateHover();
  };

  return (
    <a
      onMouseEnter={onImageMouseEnter}
      onMouseLeave={onImageMouseLeave}
      onMouseMove={onMouseMove}
    >
      <RootContainer containerRef={container} />

      <ImageTile
        ref={imageRef}
        src="../assets/tiles/woods/base.jpg"
        data-hover="../assets/titles/woods/hover.jpg"
      />
    </a>
  );
};
