import { UNITE_H, UNITE_W, columns, rows } from "../constants";
import { randomNumInRange } from "../helpers";
import { CanvasContext, Pair } from "../types";
import { BFS } from "./BFS/BFS";

export class Game {
  blocks: Pair<number>[] = [];
  vis: boolean[][] = [];

  bfs: BFS;

  constructor(public ctx: CanvasContext) {
    this.initVis();
    this.initBlocks();
    this.bfs = new BFS(this.vis, ctx);
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
    const numberOfBlocks = Math.ceil(randomNumInRange(20, 80));
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
}
