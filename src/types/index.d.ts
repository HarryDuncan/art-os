export {};

declare global {
  interface Window {
    webkitAudioContext: AudioContext;
  }
}
