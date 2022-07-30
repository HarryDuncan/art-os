import { useMemo } from "react";
import {
  AdditiveBlending,
  BufferGeometry,
  Group,
  Line,
  LineBasicMaterial,
  Points,
  ShaderMaterial,
  TextureLoader,
} from "three";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler";
import { surfaceScatteringFrag } from "visual/shaders/fragment-shaders";
import { surfaceScatteringVertex } from "visual/shaders/vertex-shaders";

export const useFormatSurfaceScattering = (
  initializedAssets,
  areAssetsInitialized
) => {
  const { sparkles, points, sparklesGeometry } = useSparkles();
  const { lines, linesMaterials } = useLines();
  return useMemo(() => {
    let group: null | Group = null;
    const materialParams: any = {
      deltaOffset: 0,
      prevX: 0,
      prevY: 0,
      lines,
      linesMaterials,
      sparkles,
      sparklesGeometry,
      currentGeometryRotation: { x: 0, y: 0 },
      rotateGeometryTo: { x: 0, y: 0 },
      rotationDirection: { x: 1, y: 1 },
    };

    const geom = initializedAssets[0]?.data.children[0];
    if (geom) {
      geom.geometry.scale(0.25, 0.25, 0.25);
      const sampler = new MeshSurfaceSampler(geom).build();
      materialParams.sampler = sampler;
      group = new Group();
    }

    if (group) {
      for (let i = 0; i < 10; i += 1) {
        const linesMesh = new LineWithCoordinates(
          new BufferGeometry(),
          linesMaterials[i % 2]
        );
        linesMesh.coordinates = [];
        // linesMesh.previous = null;
        lines.push(linesMesh);
        group.add(linesMesh);
      }
      group.add(points);
    }

    return { group, materialParams };
  }, [
    areAssetsInitialized,
    initializedAssets,
    sparkles,
    points,
    lines,
    linesMaterials,
  ]);
};

const useSparkles = () =>
  useMemo(() => {
    const sparkles = [];
    const sparklesGeometry = new BufferGeometry();
    const sparklesMaterial = new ShaderMaterial({
      uniforms: {
        pointTexture: {
          value: new TextureLoader().load("../dotTexture.png"),
        },
      },
      vertexShader: surfaceScatteringVertex.vert,
      fragmentShader: surfaceScatteringFrag.frag,
      blending: AdditiveBlending,
      alphaTest: 1.0,
      transparent: true,
    });
    const points = new Points(sparklesGeometry, sparklesMaterial);
    return { points, sparkles, sparklesGeometry };
  }, []);

const useLines = () =>
  useMemo(() => {
    const lines: LineWithCoordinates[] = [];
    const linesMaterials = [
      new LineBasicMaterial({ transparent: true, color: 0x2104db }),
      new LineBasicMaterial({ transparent: true, color: 0xf00216 }),
      new LineBasicMaterial({ transparent: true, color: 0x2104db }),
      new LineBasicMaterial({ transparent: true, color: 0xf00216 }),
      new LineBasicMaterial({ transparent: true, color: 0x2104db }),
      new LineBasicMaterial({ transparent: true, color: 0xf00216 }),
    ];
    return { lines, linesMaterials };
  }, []);

export class LineWithCoordinates extends Line {
  coordinates: any;
  previous: any;
  constructor(
    geometry?: BufferGeometry | undefined,
    material?: LineBasicMaterial | undefined
  ) {
    super(geometry, material);
    this.coordinates = [];
    this.previous = null;
  }
}
