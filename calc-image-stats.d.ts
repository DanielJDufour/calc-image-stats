export type BandStats = {
  count?: number;
  valid?: number;
  invalid?: number;
  median?: number;
  min?: number;
  max?: number;
  sum?: number;
  range?: number;
  mean?: number;
  std?: number;
  modes?: number[];
  mode?: number;
};

export type ImageStats = {
  depth: number;
  height: number;
  width: number;
  bands: BandStats[];
};

export type ImageData = number[] | number[][] | number[][][];

export type Options = {
  bands?: number;
  height?: number;
  layout?: string;
  width?: number;
  [rest: string]: any;
};

export default function calcImageStats(
  data: ImageData,
  options?: Options
): ImageStats;
