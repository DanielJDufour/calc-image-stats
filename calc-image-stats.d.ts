export type BandStats<P extends boolean> = {
  count?: P extends true ? string : number;
  valid?: P extends true ? string : number;
  invalid?: P extends true ? string : number;
  median?: P extends true ? string : number;
  min?: P extends true ? string : number;
  max?: P extends true ? string : number;
  sum?: P extends true ? string : number;
  range?: P extends true ? string : number;
  mean?: P extends true ? string : number;
  std?: P extends true ? string : number;
  modes?: P extends true ? string[] : number[];
  mode?: P extends true ? string : number;
  variance?: P extends true ? string : number;
  uniques?: P extends true ? string[] : number[];
};

export type ImageStats<P extends boolean> = {
  depth: number;
  height: number;
  width: number;
  bands: BandStats<P>[];
};

export type ImageData = number[] | number[][] | number[][][];

export default function calcImageStats<P extends boolean>(
  data: ImageData,
  options?: {
    bands?: number;
    height?: number;
    precise?: P;
    stats?: string[];
    layout?: string;
    width?: number;
    [rest: string]: any;
  }
): P extends true ? ImageStats<P> : ImageStats<false>;
