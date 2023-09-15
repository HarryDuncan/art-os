import { Axis } from "visual/display/helpers/three-dimension-space/position/position.types";

export interface VertexAdditonConfig {
  vertexPositionsCount: number;
  vertexPositionAxis: Axis;
}

export interface AdditonalVertexPosition {
  vertices: number[];
  insertPosition: number;
}
