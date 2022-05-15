import { Clock, DoubleSide, RawShaderMaterial } from "three";
import { vertex } from "./vertex";
import { fragment } from "./fragment";
import gsap from "gsap";
import { POSENET_EVENTS } from "visual/hooks/use-events/consts";
import { getPosenetDetailFromEvent } from "visual/helpers/posenetHelpers";
import { PoseNetEventTracker } from "visual/components/pose-net-event-tracker";

const minimumScoreThreshold = 0.75;
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
    this.leftWristEventTracker = new PoseNetEventTracker(minimumScoreThreshold);
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
  }

  onUpdateColor({ color }) {
    this.uniforms.color.value.set(color);
    this.uniformsNeedUpdate = true;
  }

  continueThread() {
    this.isRunningThread = !this.isRunningThread;
  }

  handleMovement(ev) {
    if (!this.isRunningThread) {
      const movementDetails = getPosenetDetailFromEvent(ev);
      this.leftWristEventTracker.addPoint(movementDetails);
    }
  }

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
