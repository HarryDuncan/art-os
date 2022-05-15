import { Clock, DoubleSide, RawShaderMaterial } from "three";
import { vertex } from "./vertex";
import { fragment } from "./fragment";
import gsap from "gsap";
import { ev } from "visual/hooks/use-events/useEvents";
import { getVanishingDirection } from "../../functions/vanishingDirection";
import { IController } from "visual/hooks/use-controller/types";

interface IUniforms {}

export default class LokiMaterial extends RawShaderMaterial {
  clock: Clock;
  isRunningThread: boolean;
  constructor(uniforms = {}) {
    super({
      vertexShader: vertex,
      fragmentShader: fragment,

      transparent: true,
      side: DoubleSide,
    });
    this.isRunningThread = true;

    this.uniforms = uniforms;
    this.clock = new Clock();

    this.bindEvents();
  }

  bindEvents() {
    // document.addEventListener("colorUpdate", (e) =>
    //   this.onUpdateColor(e.detail)
    // );
    document.addEventListener("scene:update", () => this.onUpdateTime());
    document.addEventListener("click:continue", () => this.continueThread());
  }

  onUpdateColor({ color }) {
    this.uniforms.color.value.set(color);
    this.uniformsNeedUpdate = true;
  }

  continueThread() {
    this.isRunningThread = true;
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
