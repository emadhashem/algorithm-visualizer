import {
  SHORTEST_PATH_COLOR,
  START_POINT_COLOR,
  UNITE_H,
  UNITE_W,
  VIS_POINT_COLOR,
  columns,
  dx,
  dy,
  rows,
} from "../../constants";
import { validatePoint } from "../../helpers";
import { CanvasContext, Pair } from "../../types";

export class DFS {
  start: Pair<number> = { f: 0, s: 0 };
  end: Pair<number> = { f: rows - 1, s: columns - 1 };
  nodes: Array<Pair<number>> = [];
  curNode = 0;
  delay = 0;
  parent: Pair<number>[][] = [];
  constructor(public vis: boolean[][], public ctx: CanvasContext) {
    this.drawPoint(0, 0, START_POINT_COLOR);
    this.drawPoint(this.end.f, this.end.s, SHORTEST_PATH_COLOR);
    this.doDFS(this.start.f, this.start.s);
    this.draw(0);
  }

  doDFS(i: number, j: number) {
    if (this.vis[i][j]) return;
    this.vis[i][j] = true;
    this.nodes.push({ f: i, s: j, color: VIS_POINT_COLOR });
    for (let r = 0; r < 4; r++) {
      const x = dx[r] + i;
      const y = dy[r] + j;
      if (validatePoint({ f: x, s: y }, rows, columns)) {
        this.doDFS(x, y);
      }
    }
  }

  draw = (timeStamp: number) => {
    if (this.curNode < this.nodes.length - 1) {
      requestAnimationFrame(this.draw);
      this.delay++;
    } else {
      if (this.vis[this.end.f][this.end.s]) {
        this.drawPathFound();
      } else {
        this.drawNoPathFound();
      }
      return;
    }
    if (this.delay % 2 === 0) {
      if (this.nodes[this.curNode]) {
        this.drawPoint(
          this.nodes[this.curNode].f,
          this.nodes[this.curNode].s,
          this.nodes[this.curNode].color ?? ""
        );
        this.curNode++;
      }
    }
  };

  drawPoint(x: number, y: number, color: string) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x * UNITE_W, y * UNITE_H, UNITE_W, UNITE_H);
  }

  drawNoPathFound() {
    this.ctx.font = "48px serif";
    this.ctx.fillStyle = "red";
    this.ctx.textAlign = "center";
    this.ctx.fillText("No Path Found.", 10 * UNITE_W, 10 * UNITE_H);
  }

  drawPathFound() {
    this.ctx.font = "48px serif";
    this.ctx.fillStyle = "green";
    this.ctx.textAlign = "center";
    this.ctx.fillText("Path Found", 10 * UNITE_W, 10 * UNITE_H);
  }
}
