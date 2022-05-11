import {
  BufferGeometry,
  Object3D,
  MathUtils,
  Points,
  Float32BufferAttribute,
  Color,
  Vector3,
} from "three";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler";
import ParticleMaterial from "../materials/particle-material";
import PARAMS from "../magic-object-params";
import { IMagicObjectStore } from "../MagicObject";

const MAX_PARTICLES = 20000;

export default class ParticleSystem extends Object3D {
  store: IMagicObjectStore;
  init: any;
  mat: any;

  constructor(store: IMagicObjectStore) {
    super();

    this.store = store;

    this.init = () => {
      this.initMaterial();
      this.initSystem();
    };
  }

  initMaterial() {
    const {
      progress,
      baseNoiseIteration,
      noiseDiffusion,
      noisePrecision,
      mainColor,
      lightningDiffusion,
      lightningThickness,
      vanishDirection,
      particleDiffusion,
    } = PARAMS;
    const geom = this.store.model.geometry;

    geom.computeBoundingBox();

    const size = new Vector3();
    geom.boundingBox.getSize(size);

    this.mat = new ParticleMaterial({
      progress,
      time: { value: 0 },
      baseNoiseIteration,
      noiseDiffusion,
      noisePrecision,
      lightningDiffusion,
      lightningThickness,
      vanishDirection,
      particleDiffusion,
      color: { value: new Color(mainColor) },
      size: { value: size },
      direction: { value: 1 },
      prevDirection: { value: 1 },
      speed: { value: 0 },
    });
  }

  initSystem() {
    const geom = new BufferGeometry();
    const vertices: any[] = [];
    const normals: any[] = [];
    const sizes: number[] = [];
    const colors: any[] = [];
    const randoms: any[] = [];

    const sampler = new MeshSurfaceSampler(this.store.model)
      .setWeightAttribute("uv")
      .build();
    const v3 = new Vector3();
    const n3 = new Vector3();

    for (let i = 0; i < MAX_PARTICLES; i++) {
      sampler.sample(v3, n3);

      const scale = MathUtils.randFloat(0.1, 0.25);
      const color = new Color().setHSL(Math.random(), 1, 0.5);

      sizes.push(scale);
      colors.push(color.r, color.g, color.b);
      vertices.push(v3.x, v3.y, v3.z);
      normals.push(n3.x, n3.y, n3.z);
      randoms.push(Math.random());
    }

    geom.setAttribute("position", new Float32BufferAttribute(vertices, 3));
    geom.setAttribute("normal", new Float32BufferAttribute(normals, 3));
    geom.setAttribute("scale", new Float32BufferAttribute(sizes, 1));
    geom.setAttribute("aColor", new Float32BufferAttribute(colors, 3));
    geom.setAttribute("aRandom", new Float32BufferAttribute(randoms, 1));

    const systemMesh = new Points(geom, this.mat);
    systemMesh.frustumCulled = false;

    this.add(systemMesh);
  }
}
