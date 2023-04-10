import { CoordinatesAsPercentage } from "scenes/set-up-scene-parameters/formatInteractionEvents";
import { Texture } from "three";
import { easeOutSine } from "visual/utils";

type TouchPoint = { x: number; y: number; age: number; force: number };

export default class HeatPad {
  maxAge: number;

  radius: number;

  trail: TouchPoint[];

  canvas: HTMLCanvasElement | null;

  ctx: CanvasRenderingContext2D | null;

  texture: Texture | undefined;

  constructor() {
    this.maxAge = 120;
    this.radius = 0.15;
    this.trail = [];
    this.canvas = null;
    this.ctx = null;
    this.initTexture();
  }

  initTexture() {
    this.canvas = document.createElement("canvas");
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx = this.canvas.getContext("2d");
    if (this.ctx) {
      this.ctx.fillStyle = "black";
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    this.texture = new Texture(this.canvas);
    this.canvas.id = "heat-pad";
  }

  update() {
    this.clear();
    this.trail.forEach((point, i) => {
      point.age += 1;
      if (point.age > this.maxAge) {
        this.trail.splice(i, 1);
      }
    });

    this.trail.forEach((point) => {
      this.drawTouch(point);
    });
    if (this.texture) {
      this.texture.needsUpdate = true;
    }
  }

  clear() {
    if (this.ctx && this.canvas) {
      this.ctx.fillStyle = "black";
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  addTouch(point: CoordinatesAsPercentage) {
    let force = 0;
    const last = this.trail[this.trail.length - 1];
    const { x, y } = point;
    if (last) {
      const dx = last.x - x;
      const dy = last.y - y;
      const dd = dx * dx + dy * dy;
      force = Math.min(dd * 10000, 1);
    }

    this.trail.push({
      x: point.x,
      y: point.y,
      age: 0,
      force,
    });
  }

  drawTouch(point) {
    const pos = {
      x: point.x,
      y: 1 - point.y,
    };

    let intensity = 1;

    if (point.age < this.maxAge * 0.3) {
      intensity = easeOutSine(point.age / (this.maxAge * 0.3), 0, 1, 1);
    } else {
      intensity = easeOutSine(
        1 - (point.age - this.maxAge * 0.3) / (this.maxAge * 0.7),
        0,
        1,
        1
      );
    }
    const radius = this.radius * intensity;
    if (this.ctx) {
      const grd = this.ctx.createRadialGradient(
        pos.x,
        pos.y,
        radius * 0.25,
        pos.x,
        pos.y,
        radius
      );
      grd.addColorStop(0, "rgba(255, 255, 255, 0.2)");
      grd.addColorStop(1, "rgba(0, 0, 0, 0.0)");
      this.ctx.beginPath();
      this.ctx.fillStyle = grd;
      this.ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }
}
