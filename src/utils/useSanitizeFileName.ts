export const useSanitizeFileName = (fileName: string) => {
  return fileName.replace(/ /g, "%20");
};
