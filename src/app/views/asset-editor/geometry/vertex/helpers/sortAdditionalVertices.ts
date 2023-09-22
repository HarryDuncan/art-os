import { AdditonalVertexPosition } from "../../editGeometry.types";

export const sortAdditionalVertices = (additional: AdditonalVertexPosition[]) =>
  additional.sort((a, b) => a.insertPosition - b.insertPosition);
