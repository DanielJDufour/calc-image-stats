# calc-image-stats
Calculate Band Statistics for an Image

# bash
```bash
npm install calc-image-stats
```

# usage
```js
import calcImageStats from "calc-image-stats";

// array of RGBA values of 10x10 image
const data = [
   52,  70,  42, 255, 56,  72, 53, 255,  45,  60,  45, 255,
   37,  54,  30, 255, 62,  85, 48, 255,  70,  88,  53, 255,
   // ... 376 more items
];

const stats = calcImageStats(data, { height: 10, width: 10 });
```
stats will be the following object:
```js
{
  depth: 4, // number of bands
  height: 10,
  width: 10,
  bands: [
    {
      // red band
      median: 87,
      min: 9,
      max: 220,
      sum: 10489,
      range: 211,
      mean: 104.89,
      modes: [51, 69, 87, 190],
      mode: 99.25
    },
    { ... }, // green band
    { ... }, // blue band
    {
      // alpha band
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
```