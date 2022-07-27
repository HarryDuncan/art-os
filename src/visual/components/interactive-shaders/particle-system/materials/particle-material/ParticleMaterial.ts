import gsap from 'gsap';
import { Clock, RawShaderMaterial, Vector2 } from 'three';
import { vertex } from './vertex';
import { fragment } from './fragment';

const PARAMS = {
  progress: { value: 0.5 },
  mainColor: 0xffcf79,
  particleDiffusion: { value: 1 },
  baseNoiseIteration: { value: 5 },
  noiseDiffusion: { value: 0.76 },
  noisePrecision: { value: 2.61 },
  lightningDiffusion: { value: 0.01 },

  lightningThickness: { value: 0.79 },
  lightningPower: { value: 0.07 },
  vanishDirection: { value: new Vector2(-1, 0) },

  useBloom: true,

  bloom: {
    strength: 2,
    radius: 0.16,
    threshold: 0.7,
  },
};

export default class ParticleMaterial extends RawShaderMaterial {
  clock: Clock;

  constructor(uniforms = {}) {
    super({
      vertexShader: vertex,
      fragmentShader: fragment,
      transparent: true,
      depthWrite: false,
    });

    this.uniforms = uniforms;
    this.clock = new Clock();

    this.bindEvents();
  }

  bindEvents() {
    // document.addEventListener("colorUpdate", (e) =>
    //   this.onUpdateColor(e.detail)
    // );
    document.addEventListener('scene:update', () => this.onUpdate());
  }

  onUpdateColor({ color }) {
    this.uniforms.color.value.set(color);

    this.uniformsNeedUpdate = true;
  }

  onUpdate() {
    this.uniforms.time.value += this.clock.getDelta();
    gsap.to(this.uniforms.speed, {
      value: this.uniforms.progress.value - this.uniforms.prevDirection.value,
      ease: 'power4.out',
      duration: 1.2,
      overwrite: true,
    });

    this.uniforms.prevDirection.value = this.uniforms.progress.value;
  }
}
