export const setupVideo = (url, identifier) => {
  const video = document.createElement("video");
  const root = document.getElementById("append-container");
  if (!root) return;
  root.appendChild(video);
  video.id = identifier;
  video.width = 600;
  video.height = 600;

  video.playsInline = true;
  video.muted = true;
  video.loop = true;

  // Waiting for these 2 events ensures
  // there is data in the video

  video.addEventListener(
    "playing",
    () => {
      // playing = true;
    },
    true
  );

  video.addEventListener(
    "timeupdate",
    () => {
      // timeupdate = true;
    },
    true
  );

  video.src = url;
  video.play();

  return video;
};
