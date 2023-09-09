import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  DELAY,
  UNITE_H,
  UNITE_W,
} from "./constants";
import { Game } from "./game/Game";
import { Select } from "./select/Select";

const canvas = document.getElementById("canvas1") as HTMLCanvasElement;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const ctx = canvas.getContext("2d")!;

const game = new Game(ctx);
