import { BufferGeometry } from "three";
import { LoopSubdivision } from "three-subdivide";
import { OBJExporter } from "three/examples/jsm/exporters/OBJExporter";
import { getPositionsLength } from "visual/set-up/config/mesh/geometry/attributes/attribute.functions";

export const maxVerticesCount = (geometries) =>
  Math.max(...geometries.map((geometry) => getPositionsLength(geometry)));

export const sameVerticiesCount = (geometries: BufferGeometry[]) => {
  // Find the count of the geometry with the most vertices
  const maxVerticesCount = Math.max(
    ...geometries.map((geometry) => geometry.attributes.position.count)
  );

  // Subdivide all the geometries to have the same number of vertices as the max count
  const subdividedGeometries = geometries.map((geometry) => {
    const targetVerticesCount = maxVerticesCount;
    const newGeom = geometry.clone();
    if (geometry.attributes.position.count === targetVerticesCount) {
      return geometry; // No need to subdivide if vertex count is already equal
    }

    const iterations = Math.ceil(
      Math.log2(targetVerticesCount / geometry.attributes.position.count)
    );
    const params = {
      split: true,
      uvSmooth: false,
      preserveEdges: false,
      flatOnly: false,
      maxTriangles: Infinity,
    };

    const subdivisionGeometry = newGeom;
    return LoopSubdivision.modify(subdivisionGeometry, iterations, params);
  });

  // Export all subdivided geometries as OBJ files
  const exporter = new OBJExporter();
  subdividedGeometries.forEach((geometry, index) => {
    const result = exporter.parse(geometry);
    const fileName = `model_${index}.obj`;

    // Download the OBJ file
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([result], { type: "text/plain" }));
    link.download = fileName;
    link.click();
  });
};
