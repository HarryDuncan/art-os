// import { useEffect, useRef, useState } from "react";
// const { desktopCapturer, remote } = window.require("electron");

export const SceneCaptureController = () => {
  return <div />;
  // const [selectContent, setSelectContent] = useState("Select Source");
  // const [isRecording, setIsRecording] = useState(false);
  // const videoPreview = useRef(null);

  // const { Menu } = remote ?? {};
  // const { writeFile } = window.require("fs");
  // const { dialog } = remote ?? {};
  // let [mediaRecorder, setMediaRecorder] = useState(null);
  // const recordedChunks = [];

  // const startVideo = () => {
  //   if (mediaRecorder == null) {
  //     alert("Select a source to record.");
  //   } else if (mediaRecorder.state === "recording") {
  //     alert("You must stop recording first.");
  //   } else {
  //     mediaRecorder.start();
  //     setIsRecording(true);
  //   }
  // };

  // const stopVideo = () => {
  //   if (mediaRecorder == null) {
  //     alert("Select a source and start recording first.");
  //   } else if (mediaRecorder.state === "inactive") {
  //     alert("You must start recording first.");
  //   } else {
  //     mediaRecorder.stop();
  //     setIsRecording(false);
  //   }
  // };

  // const getSources = async () => {
  //   const inputSources = await desktopCapturer.getSources({
  //     types: ["window", "screen"],
  //   });

  //   const videoOptionsMenu = Menu.buildFromTemplate(
  //     inputSources.map((source) => {
  //       return {
  //         label: source.name,
  //         click: () => selectSource(source),
  //       };
  //     })
  //   );
  //   videoOptionsMenu.popup();
  // };

  // const selectSource = async (source) => {
  //   setSelectContent(source.name);

  //   const contstraints = {
  //     audio: false,
  //     video: {
  //       mandatory: {
  //         chromeMediaSource: "desktop",
  //         chromeMediaSourceId: source.id,
  //       },
  //     },
  //   };

  //   await navigator.mediaDevices
  //     .getUserMedia(contstraints)
  //     .then((stream) => {
  //       videoPreview.current.srcObject = stream;
  //       videoPreview.current.play();

  //       const options = { mimeType: "video/webm; codecs=vp9" };
  //       mediaRecorder = new MediaRecorder(stream, options);
  //       mediaRecorder.ondataavailable = handleDataAvailable;
  //       mediaRecorder.onstop = handleStop;
  //       setMediaRecorder(mediaRecorder);
  //     })
  //     .catch((err) => console.error(err));
  // };

  // const handleDataAvailable = (e) => {
  //   recordedChunks.push(e.data);
  // };

  // const handleStop = async (e) => {
  //   const blob = new Blob(recordedChunks, {
  //     type: "video/webm; codecs=vp9",
  //   });

  //   const buffer = Buffer.from(await blob.arrayBuffer());

  //   const { filePath } = await dialog.showSaveDialog({
  //     buttonLabel: "Save video",
  //     defaultPath: `vid-${Date.now()}.webm`,
  //   });

  //   writeFile(filePath, buffer, () => {
  //     console.log("Video saved successfully");
  //   });
  // };
  // useEffect(() => {
  //   console.log(desktopCapturer);
  //   selectSource("screen");
  // }, [desktopCapturer]);
  // return (
  //   <div>
  //     {isRecording ? (
  //       <button onClick={stopVideo}>Stop Recording</button>
  //     ) : (
  //       <button onClick={startVideo}>Start Recording</button>
  //     )}
  //     <button id="selectVideo" onClick={getSources}>
  //       Source: {selectContent}
  //     </button>
  //   </div>
  // );
};
