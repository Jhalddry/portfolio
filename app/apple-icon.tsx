import { ImageResponse } from "next/og";
import { JGMark } from "./icon-mark";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(<JGMark px={180} round={false} />, size);
}
