import { MeshPhongMaterial, Vector3 } from "three";
import {
  AnimationType,
  ANIMATION_TYPES,
} from "visual/helpers/animation/animation.types";
import { AXIS } from "visual/helpers/three-dimension-space/position/position.types";

export const SPIN_ANIMATION_CONFIG = {
  animationType: ANIMATION_TYPES.SPIN as AnimationType,
  animationProperties: {
    speed: 0.005,
    rotationAxis: AXIS.Z,
    animationDurationMilis: -1,
    animationPauseMilis: -1,
    repeatAnimation: true,
  },
};

export const CONFIG_INDEX = 4;
export const ART_GEOMETRY_CONFIG = {
  scale: 0.2,
};
const SMALL_TEXT = 0.7;
export const CONFIGS = [
  // 0
  {
    compute: {
      rotation: { x: 90, y: 0, z: 0 },
      hidden: true,
    },
    date: {
      rotation: { x: 90, y: -35, z: 120 },
      hidden: true,
    },
    gallery: {
      rotation: { x: 90, y: 0, z: 160 },
      hidden: true,
    },
    hjd: {
      rotation: { x: 90, y: 0, z: -30 },
    },
    name: {
      rotation: { x: 90, y: 0, z: 0 },
      hidden: true,
    },
    announcement: {
      hidden: true,
    },
    geometryIdentifier: "hjd",
    bezierCurve: {
      startPosition: new Vector3(0, 0, -4),
      endPosition: new Vector3(0, 0, 0),
      curveSize: 0,
    },
  },
  // 1
  {
    compute: {
      rotation: { x: 90, y: 15, z: -90 },
      size: 1.35,
    },
    hjd: {
      hidden: true,
    },
    date: {
      hidden: true,
    },
    gallery: {
      hidden: true,
    },
    name: {
      hidden: true,
    },
    announcement: {
      hidden: true,
    },
    bezierCurve: {
      startPosition: new Vector3(10, 10, -0),
      endPosition: new Vector3(0, 0, 0),
      curveSize: 0,
    },
    geometryIdentifier: "compute",
  },
  // 2
  {
    compute: {
      rotation: { x: 90, y: 0, z: 0 },
      hidden: true,
    },
    hjd: {
      hidden: true,
    },
    date: {
      hidden: true,
    },
    gallery: {
      rotation: { x: 90, y: 0, z: 280 },
    },
    announcement: {
      hidden: true,
    },
    name: {
      hidden: true,
    },
    geometryIdentifier: "gallery",
    bezierCurve: {
      startPosition: new Vector3(-0, -0, -4),
      endPosition: new Vector3(0, 0, 0),
      curveSize: 0,
    },
  },
  // 3
  {
    compute: {
      hidden: true,
    },
    hjd: {
      hidden: true,
    },
    date: {
      rotation: { x: 90, y: -15, z: 285 },
    },
    gallery: {
      rotation: { x: 90, y: 0, z: 0 },
      hidden: true,
    },
    name: {
      rotation: { x: 90, y: 0, z: 0 },
      hidden: true,
    },
    announcement: {
      hidden: true,
    },

    geometryIdentifier: "date",
    bezierCurve: {
      startPosition: new Vector3(-0, 10, -0),
      endPosition: new Vector3(0, 0, 0),
      curveSize: 0,
    },
  },

  //4
  {
    compute: {
      rotation: { x: 90, y: 0, z: -0 },
      position: { y: 2.9 },
      size: 1.2,
    },
    name: {
      rotation: { x: 90, y: 0, z: -0 },
      position: { x: 0, y: 1.7 },
      size: SMALL_TEXT,
    },
    opening: {
      rotation: { x: 90, y: 0, z: -0 },
      position: { y: -0 },
      size: SMALL_TEXT,
    },
    dates: {
      rotation: { x: 90, y: 0, z: -0 },
      position: { y: -1 },
      size: SMALL_TEXT,
    },

    time: {
      rotation: { x: 90, y: 0, z: -0 },
      position: { y: 0.0 },
      size: SMALL_TEXT,
      hidden: true,
    },
    gallery: {
      rotation: { x: 90, y: 0, z: -0 },
      position: { y: -1.8 },
      size: SMALL_TEXT,
      hidden: true,
    },

    announcement: {
      hidden: true,
    },
    hjd: {
      hidden: true,
    },
    year: {
      rotation: { x: 90, y: 0, z: -0 },
      position: { y: -2.8 },
      size: SMALL_TEXT,
      hidden: true,
    },
    date: {
      rotation: { x: 90, y: 0, z: -0 },
      position: { y: -2.3, x: -SMALL_TEXT },
      size: SMALL_TEXT,
      hidden: true,
    },
    geometryIdentifier: "geometry",
    bezierCurve: {
      startPosition: new Vector3(0, 0, -4),
      endPosition: new Vector3(0, 0, 0),
      curveSize: 0,
    },
  },
];

export const ANIMATION_CONFIG = {
  animationType: ANIMATION_TYPES.TRAVERSE,
  animationProperties: {
    animationDurationMilis: 4000,
    repeatAnimation: false,
    animationPauseMilis: 0,
    startPosition: CONFIGS[CONFIG_INDEX].bezierCurve.startPosition,
    endPosition: CONFIGS[CONFIG_INDEX].bezierCurve.endPosition,
    curveSize: 0,
  },
};

export const bg = new MeshPhongMaterial({
  color: "#000000",
  specular: "#bfbfbf",
  shininess: 50,
});
