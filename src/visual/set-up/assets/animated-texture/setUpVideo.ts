export const setupVideo = (url: string, identifier: string) => {
  const video = document.createElement("video");
  const root = document.getElementById("append-container");
  const videoId = document.getElementById(identifier);

  if (!root || videoId) return;

  root.appendChild(video);
  video.id = identifier;
  video.width = 600;
  video.height = 600;
  video.preload = "none";
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
  const playPromise = video.play();
  if (playPromise !== undefined) {
    playPromise
      .then((_) => {
        // Automatic playback started!
        // Show playing UI.
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return video;
};
