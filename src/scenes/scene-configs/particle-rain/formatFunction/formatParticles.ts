import {
  BoxGeometry,
  BufferAttribute,
  BufferGeometry,
  MeshBasicMaterial,
  Vector2,
  Vector3,
  Vector4,
} from "three";
import { SceneData } from "visual/components/interactive-scene/types";
import { InteractiveShaderTypes } from "visual/components/interactive-shaders/types";
import { MATERIAL_TYPES } from "visual/helpers/geometry/three-geometry/types";
import { Asset } from "visual/hooks/use-assets/types";
import Particle from "../classes/Particle";
import { materialParams as particleRainMaterialParams } from "../particleRainMaterialParams";

export const formatParticles = (
  initializedAssets: Asset[],
  materialParams: typeof particleRainMaterialParams
): { sceneData: SceneData; uniforms; shaders } => {
  // get parameters from assets
  const drawnImage = drawImage(initializedAssets[0]);
  // format uniforms
  const uniforms = {
    uPosition: { value: new Vector2() },
    uTime: { value: 0.0 },
    palette: { value: new Vector3(0.2, 0.5, 0.4) },
    size: { value: 0.5 },
    resolution: { value: new Vector4() },
  };
  const shaders = Object.assign({}, materialParams.shaders);

  // format geometries
  const { particles, positions, rands } = populateParticles(initializedAssets);
  const geometry = new BufferGeometry();
  const plane = new BoxGeometry(2700, 2700, 2700);
  geometry.setAttribute("position", new BufferAttribute(positions, 3));
  geometry.setAttribute("rands", new BufferAttribute(rands, 1));
  return {
    sceneData: {
      isSceneDataInitialized: true,
      meshConfigs: [
        {
          materialType: MATERIAL_TYPES.interactive,
          geometry,
          materialParameters: {
            shaderType: InteractiveShaderTypes.SHADER,
            shaders,
            uniforms,
          },
        },
        {
          materialType: MATERIAL_TYPES.standard,
          geometry: plane,
          materialParameters: {
            material: new MeshBasicMaterial({
              transparent: true,
              color: 0x000000,
              opacity: settings.trails,
            }),
          },
        },
      ],
      sceneObjects: [
        { name: "particles", object: particles },
        { name: "positions", object: positions },
        { name: "image", object: drawnImage },
      ],
    },
    shaders,
    uniforms,
  };
};

const settings = {
  number: 5000,
  trails: 0.0,
  size: 0.7,
  gravity: 0.24,
  gravityDifference: 0.08,
  randomness: 0.5,
  sideScale: 4,
  speedScale: 8,
};
const populateParticles = (initializedAssets: Asset[]) => {
  const {
    imageWidth,
    imageHeight,
    naturalImageHeight,
    naturalImageWidth,
  } = getDimensionsFromImage(initializedAssets[0]);

  const positions = new Float32Array(settings.number * 3);
  const rands = new Float32Array(settings.number);
  const particles: Particle[] = [];
  for (let i = 0; i < settings.number; i += 1) {
    const x = imageWidth * (Math.random() - 0.5);
    const y = imageHeight * (Math.random() - 0.5);
    positions.set([x, y, 0], i * 3);
    rands.set([Math.random()], i);
    particles.push(
      new Particle(x, y, naturalImageWidth, naturalImageHeight, {
        imageWidth,
        imageHeight,
      })
    );
  }
  return { particles, positions, rands };
};
const getDimensionsFromImage = (image: Asset) => {
  const img = image.data as HTMLImageElement;
  const naturalImageHeight = img.naturalHeight;
  const naturalImageWidth = img.naturalWidth;
  const imageHeight = img.height;
  const imageWidth = img.width;
  return {
    naturalImageHeight,
    naturalImageWidth,
    imageHeight,
    imageWidth,
  };
};
const drawImage = (image: Asset) => {
  const {
    imageWidth,
    imageHeight,
    naturalImageHeight,
    naturalImageWidth,
  } = getDimensionsFromImage(image);
  const img = image.data as HTMLImageElement;
  const drawnImage = Array.from(
    Array(naturalImageWidth),
    () => new Array(naturalImageHeight)
  );
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  document.body.appendChild(canvas);
  canvas.width = imageWidth;
  canvas.height = imageHeight;
  if (ctx) {
    ctx.clearRect(0, 0, imageWidth, imageHeight);
    ctx.drawImage(img, 0, 0, imageWidth, imageHeight);
    const imageData = ctx.getImageData(0, 0, imageWidth, imageHeight);

    for (let i = 0; i < imageData.data.length; i = i + 4) {
      const x = (i / 4) % imageWidth;
      const y = Math.floor(i / 4 / imageWidth);
      drawnImage[x][y] = imageData.data[i] / 255;
      // this.image[x][y] = [imageData.data[i],imageData.data[i+1],imageData.data[i+2]] ;
    }
  }

  return drawnImage;
};

// populateParticles() {
//     this.positions =
//     this.rands =
//     this.particles = [];

//     for (let i = 0; i < this.settings.number; i++) {
//       let x = this.iWidth * (Math.random() - 0.5);
//       let y = this.iHeight * (Math.random() - 0.5);
//       this.positions.set([x, y, 0], i * 3);
//       this.rands.set([Math.random()], i);
//       this.particles.push(
//         new Particle({
//           x,
//           y,
//           iWidth: this.iWidth,
//           iHeight: this.iHeight,
//           pres: {w: this.imageWidth,h: this.imageHeight}
//         })
//       );
//     }

//     this.geometry.setAttribute(
//       "position",
//       new THREE.BufferAttribute(this.positions, 3)
//     );
//     this.geometry.setAttribute(
//       "rands",
//       new THREE.BufferAttribute(this.rands, 1)
//     );
//   }
