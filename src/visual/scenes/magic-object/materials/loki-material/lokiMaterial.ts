import { Clock, DoubleSide, RawShaderMaterial, Vector2 } from "three";
import { vertex } from "./vertex";
import { fragment } from "./fragment";
import gsap from "gsap";
import { POSENET_EVENTS } from "visual/hooks/use-events/consts";
import { getPosenetDetailFromEvent } from "visual/helpers/posenetHelpers";
import { PoseNetEventTracker } from "visual/components/pose-net-event-tracker";
import { POSENET_SWIPE_EVENT } from "visual/components/pose-net-event-tracker/consts";
import { AdvancedEventKey } from "visual/components/pose-net-event-tracker/types";
import { getDirectionalVector } from "visual/helpers/vectors";
import { DIRECTION_KEYS } from "visual/helpers/vectors/consts";
import { DirectionKey } from "visual/helpers/vectors/types";

const minimumScoreThreshold = 0.35;
const advancedEvents: AdvancedEventKey[] = [
  POSENET_SWIPE_EVENT.LEFT as AdvancedEventKey,
  POSENET_SWIPE_EVENT.RIGHT as AdvancedEventKey,
];
export default class LokiMaterial extends RawShaderMaterial {
  clock: Clock;
  isRunningThread: boolean;
  leftWristEventTracker: PoseNetEventTracker;
  constructor(uniforms = {}) {
    super({
      vertexShader: vertex,
      fragmentShader: fragment,

      transparent: true,
      side: DoubleSide,
    });
    this.isRunningThread = true;
    this.leftWristEventTracker = new PoseNetEventTracker(
      minimumScoreThreshold,
      advancedEvents
    );
    this.uniforms = uniforms;
    this.clock = new Clock();

    this.bindEvents();
  }

  bindEvents() {
    document.addEventListener("scene:update", () => this.onUpdateTime());
    document.addEventListener("click", () => this.continueThread());
    document.addEventListener(POSENET_EVENTS.LEFT_WRIST, (ev) =>
      this.handleMovement(ev)
    );
    document.addEventListener(POSENET_SWIPE_EVENT.RIGHT, (ev) =>
      this.onSwipeRight()
    );
    document.addEventListener(POSENET_SWIPE_EVENT.LEFT, (ev) =>
      this.onSwipeLeft()
    );
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
      this.leftWristEventTracker.addPoint(movementDetails);
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
