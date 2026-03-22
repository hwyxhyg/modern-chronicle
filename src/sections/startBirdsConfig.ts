import raw from '../assets/start/config.json';

export type StartBirdImg = {
  url: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

export type StartBirdsConfig = {
  width: number;
  height: number;
  imgs: StartBirdImg[];
};

function parseConfig(): StartBirdsConfig {
  const w = Number(raw.width);
  const h = Number(raw.height);
  return {
    width: w,
    height: h,
    imgs: raw.imgs.map((item) => ({
      url: item.url,
      x: Number(item.x),
      y: Number(item.y),
      width: Number(item.width),
      height: Number(item.height),
    })),
  };
}

export const startBirdsConfig = parseConfig();

/** 将 config 中的 ./xxx.png 解析为打包后的 URL（相对本文件） */
export function resolveStartAssetUrl(relativePath: string): string {
  const name = relativePath.replace(/^\.\//, '');
  return new URL(`../assets/start/${name}`, import.meta.url).href;
}
