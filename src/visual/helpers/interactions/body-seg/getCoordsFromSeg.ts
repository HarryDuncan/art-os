const PIXEL_SKIP = 50;
const WIDTH = 640;

type PointObj = {
  left: null | number;
  right: null | number;
  top: null | number;
  bottom: null | number;
};
export const getCoordsFromSeg = (image) => {
  if (!image) return;
  const coorObj: PointObj = {
    left: null,
    right: null,
    top: null,
    bottom: null,
  };
  const { data } = image;

  for (let i = 3; i < data.length; i += 4 * PIXEL_SKIP + WIDTH * 8) {
    if (data[i] !== 255) {
      const x = (i / 4) % 640;
      const y = i / 4 / 480;
      coorObj.left = Math.min(x, coorObj.left ?? x);
      coorObj.right = Math.max(x, coorObj.right ?? x);
      coorObj.top = Math.min(y, coorObj.top ?? y);
      coorObj.bottom = Math.max(y, coorObj.bottom ?? y);
    }
  }
  const centerX = getCenter(coorObj.left ?? 0, coorObj.right ?? 0);
  const centerY = getCenter(coorObj.top ?? 0, coorObj.bottom ?? 0);
  return { x: centerX, y: centerY };
};

const getCenter = (pointOne: number, pointTwo: number) =>
  (pointOne + pointTwo) / 2;
