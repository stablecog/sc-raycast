import { Base64 } from "js-base64";

const IMGPROXY_URL = "https://img.stablecog.com";

type TImgProxyPreset =
  | "32w"
  | "64w"
  | "128w"
  | "256w"
  | "512w"
  | "768w"
  | "1024w"
  | "1536w"
  | "1920w"
  | "2560w"
  | "3840w"
  | "full";

type TExtention = "jpeg" | "webp" | "png";

const extentionDefault: TExtention = "webp";

function getImgProxySrc({
  src,
  preset,
  extention = extentionDefault,
}: {
  src: string;
  preset: TImgProxyPreset;
  extention?: TExtention;
}) {
  return `${IMGPROXY_URL}/insecure/${preset}/${Base64.encodeURL(src)}.${extention}`;
}

export function getThumbnailImgUrl(src: string, gridSize: number) {
  return getImgProxySrc({ src, preset: gridSize === 2 ? "768w" : "512w" });
}
