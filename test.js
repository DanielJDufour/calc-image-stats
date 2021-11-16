const test = require("flug");
const readim = require("readim");
const findAndRead = require("find-and-read");
const xdim = require("xdim");

const calcImageStats = require("./calc-image-stats.js");

const expected = {
  depth: 4,
  height: 10,
  width: 10,
  bands: [
    {
      median: 87,
      min: 9,
      max: 220,
      sum: 10489,
      range: 211,
      mean: 104.89,
      modes: [51, 69, 87, 190],
      mode: 99.25
    },
    {
      median: 108,
      min: 14,
      max: 214,
      sum: 11421,
      range: 200,
      mean: 114.21,
      modes: [88, 112],
      mode: 100
    },
    {
      median: 68.5,
      min: 11,
      max: 215,
      sum: 9094,
      range: 204,
      mean: 90.94,
      modes: [44],
      mode: 44
    },
    {
      median: 255,
      min: 255,
      max: 255,
      sum: 25500,
      range: 0,
      mean: 255,
      modes: [255],
      mode: 255
    }
  ]
};

test("basic", async ({ eq }) => {
  const buf = findAndRead("flower.png");
  const { height, width, pixels } = await readim({ data: buf });
  const stats = calcImageStats(pixels, { height, width, calcHistogram: false });
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
  eq(calcImageStats(brc, { calcHistogram: false }), expected);
});
