import { SandboxContainer } from "./sandbox.styles";
import { WindowStateProvider } from "visual/compat/window-state/windowStateProvider";

export const Sandbox = () => (
  <WindowStateProvider>
    <SandboxContent />
  </WindowStateProvider>
);

const SandboxContent = () => {
  return <SandboxContainer></SandboxContainer>;
};
