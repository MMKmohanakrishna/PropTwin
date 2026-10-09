// Runs after `next build` (npm "postbuild").
//
// The static export writes route prefetch data in folders, e.g.
//   out/solutions/__next.solutions/__PAGE__.txt
// but the browser requests it as a single dotted file:
//   out/solutions/__next.solutions.__PAGE__.txt
// A Next.js server maps between the two; plain static hosts like GitHub Pages
// can't, so link prefetches 404. Write a dotted copy of each file.

import { cpSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const OUT = "out";
let copied = 0;

function filesIn(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? filesIn(path) : [path];
  });
}

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (!statSync(path).isDirectory() || name === "_next") continue;

    if (name.startsWith("__next.")) {
      for (const file of filesIn(path)) {
        const dotted = [name, ...relative(path, file).split(sep)].join(".");
        const target = join(dir, dotted);
        if (!existsSync(target)) {
          cpSync(file, target);
          copied++;
        }
      }
    } else {
      walk(path);
    }
  }
}

if (existsSync(OUT)) {
  walk(OUT);
  console.log(`[postbuild] wrote ${copied} prefetch file(s) for static hosting`);
}
