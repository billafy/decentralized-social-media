export const Colors = {
  Primary: "white",
  Link: "#93d2fd",
  PrimaryDark: "#0F1C39",
  PrimaryDisable: "#1e3f6f",
  Background: "#FEFEFE",
  Secondary: "#7B68EE",
  Black: "#212121",
  Border: "#e3e3e3",
  Gray: "rgb(148, 155, 164)",
  GrayBG: "#f7f9fa",
  Gradients: { PrimaryToSec: ["#1199FA", "#10C0E9"] },
};

const BreakPoints = {
  MobileS: "320px",
  MobileM: "375px",
  MobileL: "425px",
  Tablet: "768px",
  Laptop: "1024px",
  LaptopL: "1440px",
  Desktop: "2560px",
};

export const Devices = {
  MobileS: `(min-width: ${BreakPoints.MobileS})`,
  MobileM: `(min-width: ${BreakPoints.MobileM})`,
  MobileL: `(min-width: ${BreakPoints.MobileL})`,
  Tablet: `(min-width: ${BreakPoints.Tablet})`,
  Laptop: `(min-width: ${BreakPoints.Laptop})`,
  LaptopL: `(min-width: ${BreakPoints.LaptopL})`,
  Desktop: `(min-width: ${BreakPoints.Desktop})`,
};
