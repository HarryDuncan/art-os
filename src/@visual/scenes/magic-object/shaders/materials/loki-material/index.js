import { Clock, DoubleSide, RawShaderMaterial } from "three";
import { vertex } from "./vertex";
import { fragment } from "./fragment";

export default class LokiMaterial extends RawShaderMaterial {
  constructor(uniforms = {}) {
    super({
      vertexShader: vertex,
      fragmentShader: fragment,

      transparent: true,
      side: DoubleSide,
    });

    this.uniforms = uniforms;
    this.clock = new Clock();

    this.bindEvents();
  }

  bindEvents() {
    document.addEventListener("colorUpdate", (e) =>
      this.onUpdateColor(e.detail)
    );
    document.addEventListener("scene:update", () => this.onUpdateTime());
  }

  onUpdateColor({ color }) {
    this.uniforms.color.value.set(color);

    this.uniformsNeedUpdate = true;
  }

  onUpdateTime() {
    this.uniforms.time.value += this.clock.getDelta();
  }
}
