import { Camera, Scene, WebGLRenderer, WebGLRenderTarget } from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { defaultRenderTargetParameters } from "./consts";
import { PostProcessorCamera, PostProcessorPasses } from "./types";

export default class PostProcessor extends EffectComposer {
  scene: Scene;
  camera: PostProcessorCamera;
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
      }
    });
  }

  updateProcessorParams(camera: Camera, scene: Scene, passes?: string[]) {
    this.camera = camera as PostProcessorCamera;
    this.scene = scene;
    const renderPass = new RenderPass(this.scene, this.camera);
    this.addPass(renderPass);
  }
}
