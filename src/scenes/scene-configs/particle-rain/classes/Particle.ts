import { Vector2 } from "three";

function lerp(a, b, t) {
  return a * (1 - t) + b * t;
}

export default class particle {
  position: Vector2;

  width: number;

  height: number;

  dimensions: { imageWidth: number; imageHeight: number };

  gravity: number;

  slowGravity: number;

  vel: Vector2;

  target: number;

  friction: number;

  phase: number;

  nPosX: number;

  nPosY: number;

  constructor(
    x: number,
    y: number,
    naturalImageWidth: number,
    naturalImageHeight: number,
    dimensions: { imageWidth: number; imageHeight: number }
  ) {
    this.position = new Vector2();
    this.position.x = x || 0;
    this.position.y = y || 0;

    this.dimensions = dimensions;
    this.width = naturalImageWidth;
    this.height = naturalImageHeight;
    this.nPosX = 0;
    this.nPosY = 0;

    this.gravity = -0.1 - Math.random() / 4;
    this.slowGravity = -0.02 - Math.random() / 10;
    this.vel = new Vector2(0, this.gravity);
    this.target = this.gravity;

    this.friction = 0.9;
    this.phase = Math.random() * 2 * Math.PI;
  }

  update(image, time, progress, sideScale, speedScale) {
    this.nPosX =
      Math.floor(
        (this.dimensions.imageWidth *
          (this.position.x + (3 * this.width) / 2)) /
          this.width
      ) % this.dimensions.imageWidth;
    this.nPosY =
      Math.floor(
        (this.dimensions.imageHeight *
          (this.position.y + (3 * this.height) / 2)) /
          this.height
      ) % this.dimensions.imageHeight;
    const img = image[this.nPosX][this.dimensions.imageHeight - 1 - this.nPosY];
    this.target = -0.1 - img;
    this.vel.x =
      sideScale *
      Math.sin(time + this.phase) *
      (0.1 - img * 0.075) *
      (1 - progress);
    this.vel.y =
      speedScale * lerp(this.slowGravity, this.gravity, img * (1 - progress));
    this.position = this.position.add(this.vel);
    if (this.position.y < -this.height / 2) {
      this.position.y = this.height / 2;
      this.position.x = (Math.random() - 0.5) * this.width;
    }
  }
}
