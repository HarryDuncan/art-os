import { Camera, Scene, Vector2, WebGLRenderTarget } from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
// import { SMAAPass } from "three/examples/jsm/postprocessing/SMAAPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { getWindowParams } from "visual/helpers/getWindowParams";

import PARAMS from "../../scenes/magic-object/magic-object-params";
import { defaultRenderTargetParameters } from "./consts";

export default class PostProcessing extends EffectComposer {
  scene: Scene;
  camera: Camera;

  bloomPass: any;
  constructor({ renderer, scene, camera }) {
    const renderTarget = new WebGLRenderTarget(
      window.innerHeight,
      window.outerHeight,
      defaultRenderTargetParameters
    );

    super(renderer, renderTarget);
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.onResize();

    // const renderPass = new RenderPass(scene, camera);
    // this.addPass(renderPass);
    this.addCustomPasses();

    this.bindEvents();
  }

  bindEvents() {
    document.addEventListener("layout:change", () => this.onResize());
    document.addEventListener("postUpdate", () => this.onPostNeedUpdate());
  }

  /* Handlers
    --------------------------------------------------------- */

  onResize() {
    // const { W, H, PR } = Layout
    // this.setSize(W, H)
  }

  onPostNeedUpdate() {
    // const { bloom } = PARAMS;
    // const mod = 1;
    // this.bloomPass.strength = bloom.strength * mod;
    // this.bloomPass.radius = bloom.radius * mod;
    // this.bloomPass.threshold = bloom.threshold * mod;
  }

  addCustomPasses() {
    const renderPass = new RenderPass(this.scene, this.camera);
    this.addPass(renderPass);

    const { bloom } = PARAMS;
    const modifier = 1;
    const { width, height } = getWindowParams();
    this.bloomPass = new UnrealBloomPass(
      new Vector2(width, height),
      bloom.strength * modifier,
      bloom.radius * modifier,
      bloom.threshold * modifier
    );
    this.bloomPass.strength = bloom.strength * modifier;
    this.bloomPass.radius = bloom.radius * modifier;
    this.bloomPass.threshold = bloom.threshold * modifier;

    this.addPass(this.bloomPass);

    // this.smaaPass = new SMAAPass(width * pixelRatio, height * pixelRatio);
    // this.addPass(this.smaaPass);
  }
}
