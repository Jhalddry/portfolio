import { ImageResponse } from "next/og";
import { JGMark } from "./icon-mark";

export const size = { width: 48, height: 48 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(<JGMark px={48} />, size);
}
