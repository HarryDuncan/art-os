import { Clock, DoubleSide, RawShaderMaterial, Vector2 } from "three";

import gsap from "gsap";
import { getPosenetDetailFromEvent } from "visual/helpers/posenetHelpers";

import { getDirectionalVector } from "visual/helpers/vectors";
import { DIRECTION_KEYS } from "visual/helpers/vectors/consts";
import { DirectionKey } from "visual/helpers/vectors/types";

interface InteractiveShaderProps {
  vertexShader: string;
  fragmentShader: string;
  uniforms: any;
}
export default class InteractiveShader extends RawShaderMaterial {
  clock: Clock;
  isRunningThread: boolean;

  constructor({
    vertexShader,
    fragmentShader,
    uniforms,
  }: InteractiveShaderProps) {
    super({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      side: DoubleSide,
    });
    this.isRunningThread = true;
    this.uniforms = uniforms;
    this.clock = new Clock();

    this.bindEvents();
  }

  bindEvents() {
    document.addEventListener("scene:update", () => this.onUpdateTime());
    document.addEventListener("click", () => this.continueThread());
  }

  onUpdateColor({ color }) {
    this.uniforms.color.value.set(color);
    this.uniformsNeedUpdate = true;
  }

  continueThread() {
    this.isRunningThread = !this.isRunningThread;
  }

  // POSENET

  handleMovement(ev) {
    if (!this.isRunningThread) {
      const movementDetails = getPosenetDetailFromEvent(ev);
    }
  }
  onSwipeRight() {
    this.uniforms.vanishDirection.value = getDirectionalVector({
      referenceVector: this.uniforms.vanishDirection.value,
      directionKey: DIRECTION_KEYS.LEFT_TO_RIGHT as DirectionKey,
    });

    this.startThread();
  }

  onSwipeLeft() {
    this.uniforms.vanishDirection.value = getDirectionalVector({
      referenceVector: this.uniforms.vanishDirection.value,
      directionKey: DIRECTION_KEYS.RIGHT_TO_LEFT as DirectionKey,
    });
    this.startThread();
  }

  startThread() {
    setTimeout(() => {
      this.isRunningThread = true;
    }, 100);
  }
  // RENDER FUNCTIONS

  onUpdateTime() {
    if (this.isRunningThread) {
      this.uniforms.time.value += this.clock.getDelta();
      gsap.to(this.uniforms.progress, {
        value: this.uniforms.progress.value + this.uniforms.delta.value,
        ease: "power4.out",
        duration: 1.2,
        overwrite: true,
      });

      this.changeDirectionOnComplete();
    }
  }

  changeDirectionOnComplete = () => {
    if (
      (this.uniforms?.progress.value > 1.0 && this.uniforms.delta.value > 0) ||
      (this.uniforms.progress.value < 0 && this.uniforms.delta.value < 0)
    ) {
      this.uniforms.delta.value = this.uniforms.delta.value < 0 ? 0.01 : -0.01;
      this.isRunningThread = false;
    }
  };
}
