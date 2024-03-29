const fs = require("fs");
const test = require("flug");
const readim = require("readim");
const findAndRead = require("find-and-read");
const xdim = require("xdim");

const calcImageStats = require("./dist/calc-image-stats.min.js");

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
  const { height, width, data } = await readim({ data: buf });
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
  const stats = calcImageStats(data, {
    height,
    width,
    stats: calc_these_stats
  });
  eq(stats, expected);

  const { data: brc } = xdim.transform({
    data,
    from: "[row,column,band]",
    to: "[band][row][column]",
    sizes: {
      band: 4,
      row: height,
      column: width
    }
  });
  eq(calcImageStats(brc, { stats: calc_these_stats }), expected);
});

test("precise variance", async ({ eq }) => {
  const buf = findAndRead("flower.png");
  const { height, width, pixels } = await readim({ data: buf });
  const stats = calcImageStats(pixels, {
    height,
    precise: true,
    width,
    stats: ["variance"]
  });
  eq(stats, {
    depth: 4,
    height: 10,
    width: 10,
    bands: [
      { variance: "2906.1579" },
      { variance: "2153.8659" },
      { variance: "3066.1564" },
      { variance: "0" }
    ]
  });
});

// test("large", ({ eq }) => {
//   const band = JSON.parse(fs.readFileSync("./data/band.json")).map(row =>
//     Uint8Array.from(row)
//   );
//   const bands = [band, band, band];
//   const stats = calcImageStats(bands, {
//     height: 3974,
//     layout: "[band][row][column]",
//     noData: null,
//     precise: false,
//     stats: ["max", "min", "range"],
//     width: 7322
//   });
//   console.log("stats:", stats);
// });
