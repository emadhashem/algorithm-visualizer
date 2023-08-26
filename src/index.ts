import { CANVAS_HEIGHT, CANVAS_WIDTH, UNITE_H, UNITE_W } from "./constants";

const canvas = document.getElementById("canvas1") as HTMLCanvasElement;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const ctx = canvas.getContext("2d")!;

for (let i = 30; i <= CANVAS_WIDTH; i += 30) {
  ctx.beginPath();
  ctx.moveTo(i, 0);
  ctx.lineTo(i, CANVAS_WIDTH);
  ctx.strokeStyle = "white";
  ctx.stroke();
  ctx.closePath();
}

for (let i = 25; i <= CANVAS_HEIGHT; i += 25) {
  ctx.beginPath();
  ctx.moveTo(0, i);
  ctx.lineTo(CANVAS_WIDTH, i);
  ctx.strokeStyle = "white";
  ctx.stroke();
  ctx.closePath();
}

ctx.fillStyle = " red";
ctx.fillRect(5 * UNITE_W, 3 * UNITE_H, UNITE_W, UNITE_H);
