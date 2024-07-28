import { VideoBackgroundContainer } from "./VideoBackground.styles";

export const VideoBackground = ({
  videoSrc,
}: {
  videoSrc: string | undefined;
}) => {
  if (!videoSrc) return null;
  console.log(videoSrc);
  return (
    <VideoBackgroundContainer>
      <video preload="auto" autoPlay muted loop>
        <source src={videoSrc} type="video/mp4" />
      </video>
    </VideoBackgroundContainer>
  );
};
