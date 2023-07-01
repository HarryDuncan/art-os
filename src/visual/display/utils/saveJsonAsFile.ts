import { app, dialog } from "electron";
import * as fs from "fs";
import path from "path";

export const saveJSON = (
  jsonObject: Record<string, unknown>,
  filename: string
): void => {
  // Get the path to the public directory of the Electron app
  const publicPath = app.getPath("appData");

  // Create the full file path by joining the public path with the specified filename
  const filePath = path.join(publicPath, filename);

  // Convert the JSON object to a string
  const jsonString = JSON.stringify(jsonObject);

  // Write the JSON string to the file
  fs.writeFile(filePath, jsonString, (error) => {
    if (error) {
      // If an error occurred, show an error message to the user
      dialog.showErrorBox("Error", error.message);
    }
  });
};
