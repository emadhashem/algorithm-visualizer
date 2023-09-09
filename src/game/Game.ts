import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  UNITE_H,
  UNITE_W,
  columns,
  rows,
} from "../constants";
import { randomNumInRange } from "../helpers";
import { Select } from "../select/Select";
import { CanvasContext, Pair } from "../types";
import { BFS } from "./BFS/BFS";
import { DFS } from "./DFS/DFS";

export class Game {
  blocks: Pair<number>[] = [];
  vis: boolean[][] = [];

  bfs: BFS | null = null;
  dfs: DFS | null = null;

  select: Select;

  constructor(public ctx: CanvasContext) {
    this.initBlocks();
    this.select = new Select(this);
    document.getElementById("reset-blocks")?.addEventListener("click", () => {
      this.initBlocks();
    });
  }

  initVis() {
    for (let i = 0; i < 22; i++) {
      this.vis[i] = [];
      for (let j = 0; j < 22; j++) {
        this.vis[i][j] = false;
      }
    }
  }

  initBlocks() {
    this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    this.initVis();
    this.blocks = [];
    this.init();

    const numberOfBlocks = Math.ceil(randomNumInRange(20, 100));
    for (let i = 0; i < numberOfBlocks; i++) {
      this.blocks.push({
        f: randomNumInRange(1, columns),
        s: randomNumInRange(1, rows),
      });
    }
    this.blocks.forEach((item) => {
      this.vis[item.f][item.s] = true;
      this.ctx.fillStyle = "#ED7B7B";
      this.ctx.fillRect(item.f * UNITE_W, item.s * UNITE_H, UNITE_W, UNITE_H);
    });
  }

  init() {
    for (let i = UNITE_W; i <= CANVAS_WIDTH; i += UNITE_W) {
      this.ctx.beginPath();
      this.ctx.moveTo(i, 0);
      this.ctx.lineTo(i, CANVAS_WIDTH);
      this.ctx.strokeStyle = "gray";
      this.ctx.stroke();
      this.ctx.closePath();
    }

    for (let i = UNITE_H; i <= CANVAS_HEIGHT; i += UNITE_H) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, i);
      this.ctx.lineTo(CANVAS_WIDTH, i);
      this.ctx.strokeStyle = "gray";
      this.ctx.stroke();
      this.ctx.closePath();
    }
  }

  clear() {
    this.initBlocks();
    this.init();
    if (this.bfs) {
      this.bfs.nodes = [];
    }

    if (this.dfs) {
      this.dfs.nodes = [];
    }
  }
}
