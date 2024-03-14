import { Mesh } from "three";
import { OBJExporter } from "three/examples/jsm/exporters/OBJExporter";
import { splitGeometry } from "../geometry/buffer-geometry/splitGeometry";

// Handle export button click
export const handleExportLargeFile = async (geometry, geometryId, fileName) => {
  const splitGeometries = splitGeometry(geometry, 3);
  splitGeometries.forEach((geom, index) => {
    const mesh = new Mesh(geom);
    mesh.name = geometryId;
    const exporter = new OBJExporter();
    const objData = exporter.parse(mesh);
    console.log("obj data created");
    // Create a Blob and a download link
    const blob = new Blob([objData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${fileName}-${index}.obj`;
    link.click();

    // Clean up
    URL.revokeObjectURL(url);
  });
};

// Handle export button click
export const handleExportClick = async (geometry, geometryId, fileName) => {
  try {
    const mesh = new Mesh(geometry);
    mesh.name = geometryId;
    const exporter = new OBJExporter();
    const objData = exporter.parse(mesh);

    // Create a Blob and a download link
    const blob = new Blob([objData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${fileName}.obj`;
    link.click();

    // Clean up
    URL.revokeObjectURL(url);
  } catch (e) {
    handleExportLargeFile(geometry, geometryId, fileName);
  }
};
