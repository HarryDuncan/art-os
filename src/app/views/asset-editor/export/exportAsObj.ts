import { OBJExporter } from "three/examples/jsm/exporters/OBJExporter";

// Handle export button click
export const handleExportClick = (geometry, fileName) => {
  const exporter = new OBJExporter();
  const objData = exporter.parse(geometry);

  // Create a Blob and a download link
  const blob = new Blob([objData], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `${fileName}.obj`;
  link.click();

  // Clean up
  URL.revokeObjectURL(url);
};
