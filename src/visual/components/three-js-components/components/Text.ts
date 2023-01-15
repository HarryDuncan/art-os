import { Mesh, MeshPhongMaterial } from "three";
import { Text as TroikaText } from "troika-three-text";
export const Text = ({ name, text, font }) => {
  const myText = new TroikaText();
  myText.text = text;
  myText.fontSize = 0.5;
  myText.position.z = 0;
  myText.color = 0x9966ff;

  // Update the rendering:
  myText.sync();
  console.log(myText);
  return myText;
};
