const calcStats = require("calc-stats");
const guessImageLayout = require("guess-image-layout");
const xdim = require("xdim");

const range = ct => new Array(ct).fill(0).map((_, i) => i);

/**
 * @name calcImageStats
 * @param {Array} values - multi-dimensional array of numbers
 * @param {options} options - Options
 * @param {options} options.bands - number of bands (3 for RGB, 4 for RGBA)
 * @param {options} options.height - height of image
 * @param {options} options.width - width of image
 * @param {options} options.layout - layout of values (using xdim layout syntax)
 */
function calcImageStats(
  values,
  { bands, height, width, layout, ...rest } = {}
) {
  // create iterators for bands

  const result = guessImageLayout({ bands, data: values, height, width });
  bands ??= result.bands;
  height ??= result.height;
  layout ??= result.layout;
  width ??= result.width;

  const bandRange = range(bands);

  const bandStats = bandRange.map(bandIndex => {
    const rect = { band: [bandIndex, bandIndex] };
    const sizes = { band: bands, column: width, row: height };
    const band = xdim.iterClip({ data: values, layout, rect, sizes });

    return calcStats(band, rest);
  });

  return { depth: bands, height, width, bands: bandStats };
}

module.exports = calcImageStats;
