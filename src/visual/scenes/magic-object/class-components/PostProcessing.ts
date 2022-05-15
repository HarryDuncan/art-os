import {
  Camera,
  Scene,
  Vector2,
  WebGLMultisampleRenderTarget,
  WebGLRenderTarget,
} from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { SMAAPass } from "three/examples/jsm/postprocessing/SMAAPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { getWindowParams } from "visual/helpers/getWindowParams";

// Passes
// import CustomShaderPass from '@passes/template-pass'
import PARAMS from "../magic-object-params";

/* POST PROCESSING
---------------------------------------------------------------------------------------------------- */

export default class PostProcessing extends EffectComposer {
  scene: Scene;
  camera: Camera;
  bloomPass: any;
  smaaPass: any;
  constructor({ renderer: R, scene, camera }) {
    const RTClass =
      R.getPixelRatio() === 1 && R.capabilities.isWebGL2
        ? WebGLMultisampleRenderTarget
        : WebGLRenderTarget;

    const RTComposer = new RTClass(1, 1);

    super(R, RTComposer);

    this.scene = scene;
    this.camera = camera;
    this.renderer = R;

    this.onResize();

    const renderPass = new RenderPass(scene, camera);
    this.addPass(renderPass);
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
    const { bloom } = PARAMS;
    const mod = 1;

    this.bloomPass.strength = bloom.strength * mod;
    this.bloomPass.radius = bloom.radius * mod;
    this.bloomPass.threshold = bloom.threshold * mod;
  }

  /* Actions
    --------------------------------------------------------- */

  addCustomPasses() {
    const W = window.innerWidth;
    const H = window.innerHeight;

    const { bloom } = PARAMS;

    // this.custompass = new CustomShaderPass()

    // this.addPass(this.custompass)

    const modifier = 1;
    const { width, height, pixelRatio } = getWindowParams();
    this.bloomPass = new UnrealBloomPass(
      new Vector2(width * pixelRatio, height * pixelRatio),
      bloom.strength * modifier,
      bloom.radius * modifier,
      bloom.threshold * modifier
    );
    this.bloomPass.strength = bloom.strength * modifier;
    this.bloomPass.radius = bloom.radius * modifier;
    this.bloomPass.threshold = bloom.threshold * modifier;

    this.addPass(this.bloomPass);

    this.smaaPass = new SMAAPass(width * pixelRatio, height * pixelRatio);
    this.addPass(this.smaaPass);
  }
}
