import { Clock, DoubleSide, RawShaderMaterial } from "three";
import gsap from "gsap";
import { InteractionEventObject } from "visual/hooks/use-interactions/types";
import { InteractiveShaders } from "./types";

export default class InteractiveMaterial extends RawShaderMaterial {
  clock: Clock;
  isRunningThread: boolean;
  interactionEvents: InteractionEventObject[];
  constructor(uniforms, shaders: InteractiveShaders, interactions) {
    super({
      vertexShader: shaders.vertexShader.vert,
      fragmentShader: shaders.fragmentShader.frag,
      transparent: true,
      side: DoubleSide,
    });
    this.isRunningThread = true;
    this.uniforms = uniforms;
    this.clock = new Clock();
    this.interactionEvents = interactions;
    document.addEventListener("scene:update", () => this.onUpdateTime());
    interactions.forEach(({ eventKey }) => {
      document.addEventListener(`${eventKey}`, (ev) => this.onGestureEvent(ev));
    });
  }

  onGestureEvent(event: Event) {
    const { type } = event;
    const currentAction = this.interactionEvents.find(
      (interactionEvent) => interactionEvent.eventKey === type
    );

    if (currentAction?.eventFunction) {
      currentAction.eventFunction(this);
    }
  }

  continueThread() {
    this.isRunningThread = !this.isRunningThread;
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

      this.changeAnimationDirection();
    }
  }

  changeAnimationDirection = () => {
    if (
      (this.uniforms?.progress.value > 1.0 && this.uniforms.delta.value > 0) ||
      (this.uniforms.progress.value < 0 && this.uniforms.delta.value < 0)
    ) {
      this.isRunningThread = false;
    }
  };
}
