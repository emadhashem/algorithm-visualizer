import { Pair } from "./types";

export function randomNumInRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

export function validatePoint(p: Pair<number>, n: number, m: number) {
  return p.f >= 0 && p.f < n && p.s >= 0 && p.s < m;
}

export function shuffle(arr: any[]) {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    const newIdx = randomNumInRange(0, n - 1);
    let tmp = arr[i];
    arr[i] = arr[newIdx];
    arr[newIdx] = tmp;
  }
  return arr;
}
