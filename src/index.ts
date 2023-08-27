import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  DELAY,
  UNITE_H,
  UNITE_W,
} from "./constants";
import { Game } from "./game/Game";
import { Pair } from "./types";

const canvas = document.getElementById("canvas1") as HTMLCanvasElement;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const ctx = canvas.getContext("2d")!;


for (let i = UNITE_W; i <= CANVAS_WIDTH; i += UNITE_W) {
  ctx.beginPath();
  ctx.moveTo(i, 0);
  ctx.lineTo(i, CANVAS_WIDTH);
  ctx.strokeStyle = "gray";
  ctx.stroke();
  ctx.closePath();
}

for (let i = UNITE_H; i <= CANVAS_HEIGHT; i += UNITE_H) {
  ctx.beginPath();
  ctx.moveTo(0, i);
  ctx.lineTo(CANVAS_WIDTH, i);
  ctx.strokeStyle = "gray";
  ctx.stroke();
  ctx.closePath();
}

const game = new Game(ctx);

