import localFont from "next/font/local";
import { Quicksand,Inter } from "next/font/google";
export const BRILLANT_REGULAR = localFont({
  src: "./brillant.regular.otf",
});
export const QUICKSAND = Quicksand({ subsets: ["latin"], weight: ["600"] });
export const INTER = Inter({ subsets: ["latin"], weight: ["600"] });
