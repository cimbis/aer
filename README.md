# Aerones Case Study

## About

There are four main elements in the app:

- 2d video with canvas overlay
- 3d video
- video controls for playing / pausing / re-starting video
- ruler like canvas element that allows navigating between annotations

## Building / launching the project

- Copy and paste video file `GS012237-stitched.mp4` into `./src/assets`
- There are two thumbnail images generated
  from `all_frames_processed_GS012237_1719791982345517` that are used in a ruler like
  canvas that allows to seek video to specific point in time:
    - `thumb_21_R_1592_5.27_.png`
    - `thumb_111_R_1972_5.23_.png`
- Two excerpts from `defects_coco_GS012237_1719791982345517.json` are placed in `App.tsx`
  that correspond to images and thumbnails used in the project
- use `pnpm` as package manager
- install dependencies with `pnpm i`
- to launch dev server run `pnpm dev`

> If `pnpm build` is run, it will fail because `vite` is unable to process videos of such
> large size

## Assumptions made

- bbox coordinates in json are defined as an array with four values, from which upper left
  and lower right coordinates of an annotation can be extracted:

```javascript
const coordinate: {
    x1: bbox[0],
    y1: bbox[2],
    x2: bbox[1],
    y2: bbox[3],
};
```

- there's no "time" property for annotated entries in json file, a value that's in between
  the previous object and the next was assigned to annotations

## Project structure

- There aren't many components - all of them lie in `./src/components/`
- The main "controller" is the `App.tsx` component
- Most of the logic is encapsulated in hooks to keep the components themselves lean
