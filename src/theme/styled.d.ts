import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    spacing: (multiple?: number) => number;
    colors: {
      mono: {
        ui01: "#171719";
        ui02: "#202123";
        ui03: "#262a2d";
        ui04: "#373d43";
        ui05: "#5a6872";
        ui06: "#c6cdd2";
        text01: "#fff";
        text02: "#c6cdd2";
        text03: "#98a5ae";
      };
      threshold: {
        low: "#a0f751";
        lowmid: "#d1d40e";
        mid: "#f9ef00";
        midhigh: "#ff7326";
        high: "#dc4545";
      };
      brand: {
        brand01: "#0081a1";
        brand02: "#59cbe8";
      };
    };
    font: {
      default: {
        family: "Inter, Arial, Helvetica, sans-serif";
        weight: {
          light: 200;
          normal: 400;
          bold: 700;
        };
      };
      alternative: {
        family: '"Source Sans Pro", monospace';
      };
    };
  }
}
