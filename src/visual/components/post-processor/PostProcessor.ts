import { Camera, Scene, WebGLRenderer, WebGLRenderTarget } from "three";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { defaultRenderTargetParameters } from "./consts";
import { getBloomPass } from "./render-passes/getBloomPass";
import {
  PostProcessorCamera,
  PostProcessorPasses,
  ExtendedEffectComposer,
} from "./types";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";

export default class PostProcessor extends EffectComposer {
  scene: Scene;
  camera: PostProcessorCamera;
  renderer: WebGLRenderer;
  constructor({
    renderer,
    scene,
    camera,
    passes = [],
  }: {
    renderer: WebGLRenderer;
    camera: Camera;
    scene: Scene;
    passes?: PostProcessorPasses[];
  }) {
    const renderTarget = new WebGLRenderTarget(
      window.innerHeight,
      window.outerHeight,
      defaultRenderTargetParameters
    );

    super(renderer, renderTarget);
    this.scene = scene;
    this.camera = camera as PostProcessorCamera;
    this.renderer = renderer;
    this.addPasses(passes);
    this.bindEvents();
  }

  bindEvents() {
    window.addEventListener("resize", () => this.onResize());
  }

  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  addPasses(passes: PostProcessorPasses[]) {
    const renderPass = new RenderPass(this.scene, this.camera);
    this.addPass(renderPass);
    passes.forEach((renderPassType) => {
      switch (renderPassType) {
        case PostProcessorPasses.BLOOM:
          const bloomPass = getBloomPass();
          this.addPass(bloomPass);
      }
    });
  }

  updateProcessorParams(
    camera: Camera,
    scene: Scene,
    passes?: PostProcessorPasses[]
  ) {
    this.camera = camera as PostProcessorCamera;
    this.scene = scene;
    const renderPass = new RenderPass(this.scene, this.camera);
    this.addPass(renderPass);
  }
}
