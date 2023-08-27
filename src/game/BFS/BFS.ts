import {
  DELAY,
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

export class BFS {
  start: Pair<number> = { f: 0, s: 0 };
  end: Pair<number> = { f: rows - 1, s: columns - 1 };
  q: Array<Pair<number>> = [];
  nodes: Array<Pair<number>> = [];
  curNode = 0;

  constructor(public vis: boolean[][], public ctx: CanvasContext) {
    this.drawPoint(0, 0, START_POINT_COLOR);
    this.drawPoint(this.end.f, this.end.s, SHORTEST_PATH_COLOR);
    this.doBFS();
  }

  doBFS() {
    this.q.push(this.start);
    this.vis[this.start.f][this.start.s] = true;
    while (this.q.length) {
      const cur = this.q[0];
      this.q.splice(0, 1);
      if (cur.f === this.end.f && cur.s === this.end.s) {
        break;
      }

      for (let r = 0; r < 4; r++) {
        const x = dx[r] + cur.f;
        const y = dy[r] + cur.s;
        if (validatePoint({ f: x, s: y }, rows, columns) && !this.vis[x][y]) {
          this.q.push({ f: x, s: y });
          this.vis[x][y] = true;
          this.nodes.push({ f: x, s: y });
        }
      }
    }

    this.draw(0);
  }
  draw = (timeStamp: number) => {
    setTimeout(() => {
      if (this.curNode < this.nodes.length - 1) {
        requestAnimationFrame(this.draw);
        if (this.nodes[this.curNode]) {
          this.drawPoint(
            this.nodes[this.curNode].f,
            this.nodes[this.curNode].s
          );
        }
      }
      this.curNode++;
    }, DELAY);
  };

  drawPoint(x: number, y: number, color: string = VIS_POINT_COLOR) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x * UNITE_W, y * UNITE_H, UNITE_W, UNITE_H);
  }
}
