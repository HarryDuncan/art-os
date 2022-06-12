export const getFileTypeFromFilename = (filename: string) => {
  return filename.split(".").pop();
};
