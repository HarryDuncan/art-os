export const downloadJsonFile = (
  jsonData: Record<string, unknown> | Record<string, unknown>[],
  fileName: string
) => {
  const blob = new Blob([JSON.stringify(jsonData)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${fileName}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
