import { colors } from "../constants/colors";
import { getRandomInt } from "../utils";

export const getRandomColor = () => {
  let color = colors[getRandomInt(colors.length)];
  return color["hexString"];
};
