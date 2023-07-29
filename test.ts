import test from "flug";
import readim from "readim";
import findAndRead from "find-and-read";
import * as xdim from "xdim";

import calcImageStats from ".";

const expected = {
  depth: 4,
  height: 10,
  width: 10,
  bands: [
    {
      count: 100,
      valid: 100,
      invalid: 0,
      median: 87,
      min: 9,
      max: 220,
      sum: 10489,
      range: 211,
      mean: 104.89,
      std: 53.908792418305936,
      modes: [51, 69, 87, 190],
      mode: 99.25
    },
    {
      count: 100,
      valid: 100,
      invalid: 0,
      median: 108,
      min: 14,
      max: 214,
      sum: 11421,
      range: 200,
      mean: 114.21,
      std: 46.4097608267916,
      modes: [88, 112],
      mode: 100
    },
    {
      count: 100,
      valid: 100,
      invalid: 0,
      median: 68.5,
      min: 11,
      max: 215,
      sum: 9094,
      range: 204,
      mean: 90.94,
      std: 55.37288506119217,
      modes: [44],
      mode: 44
    },
    {
      count: 100,
      valid: 100,
      invalid: 0,
      median: 255,
      min: 255,
      max: 255,
      sum: 25500,
      range: 0,
      mean: 255,
      std: 0,
      modes: [255],
      mode: 255
    }
  ]
};

test("basic", async ({ eq }) => {
  const buf = findAndRead("flower.png");
  const { height, width, data: pixels } = await readim({ data: buf });
  const calc_these_stats = [
    "count",
    "invalid",
    "valid",
    "std",
    "range",
    "median",
    "min",
    "max",
    "sum",
    "range",
    "mean",
    "modes",
    "mode"
  ];
  const stats = calcImageStats(pixels as Uint8Array, {
    height,
    width,
    stats: calc_these_stats
  });
  eq(stats, expected);

  const { data: brc } = xdim.transform({
    data: pixels,
    from: "[row,column,band]",
    to: "[band][row][column]",
    sizes: {
      band: 4,
      row: height,
      column: width
    }
  });
  eq(calcImageStats(brc, { stats: calc_these_stats }), expected);
  eq(calcImageStats(brc, { stats: ["uniques"] }).bands[0].uniques?.length, 70);
  eq(calcImageStats(brc, { precise: true, stats: ["variance"] }).bands[0], {
    variance: "2906.1579"
  });
});
