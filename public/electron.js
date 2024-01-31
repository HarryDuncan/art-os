const { app, BrowserWindow, desktopCapturer } = require("electron");
const path = require("node:path");
const isDev = require("electron-is-dev");
const RecordRTC = require("recordrtc");
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    webPreferences: { nodeIntegration: true, contextIsolation: false },
    autoHideMenuBar: true,
  });
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3005"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

app.on("startRecording", (event, targetWindowId) => {
  const constraints = {
    types: ["window"],
    thumbnailSize: { width: 1920, height: 1080 },
    fetchWindowIcons: true,
  };

  desktopCapturer.getSources(constraints).then(async (sources) => {
    const targetSource = sources.find((source) => source.id === targetWindowId);

    if (targetSource) {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          mandatory: {
            chromeMediaSource: "desktop",
            chromeMediaSourceId: targetSource.id,
          },
        },
      });

      const recordRTC = RecordRTC(stream, {
        type: "video",
        mimeType: "video/webm",
        bitsPerSecond: 128000,
        frameInterval: 90,
        quality: 10,
      });

      recordRTC.startRecording();

      app.once("stopRecording", () => {
        recordRTC.stopRecording(() => {
          const blob = recordRTC.getBlob();

          const buffer = Buffer.from(blob, "binary");
          event.reply("recordingCompleted", buffer);
        });
      });
    }
  });
});
