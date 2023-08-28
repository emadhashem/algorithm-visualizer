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

  nodeColor = VIS_POINT_COLOR;
  numberOfVis = 0;

  parent: Pair<number>[][] = [];

  constructor(public vis: boolean[][], public ctx: CanvasContext) {
    this.drawPoint(0, 0, START_POINT_COLOR);
    this.drawPoint(this.end.f, this.end.s, SHORTEST_PATH_COLOR);
    this.initParent();
    this.doBFS();
  }

  initParent() {
    for (let i = 0; i < 22; i++) {
      this.parent[i] = [];
      for (let j = 0; j < 22; j++) {
        this.parent[i][j] = { f: -1, s: -1 };
      }
    }
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
          this.parent[x][y] = cur;
          this.nodes.push({ f: x, s: y });
        }
      }
    }
    this.numberOfVis = this.nodes.length;
    let arr = [];
    let cur = this.parent[this.end.f][this.end.s];
    while (cur.f != -1) {
      arr.push(cur);
      cur = this.parent[cur.f][cur.s];
    }
    this.nodes = [...this.nodes, ...arr];
    this.draw(0);
  }
  draw = (timeStamp: number) => {
    setTimeout(() => {
      if (this.curNode < this.nodes.length - 1) {
        requestAnimationFrame(this.draw);
        if (this.nodes[this.curNode]) {
          this.drawPoint(
            this.nodes[this.curNode].f,
            this.nodes[this.curNode].s,
            this.curNode >= this.numberOfVis
              ? SHORTEST_PATH_COLOR
              : this.nodeColor
          );
          this.curNode++;
        } else {
          if (this.parent[this.end.f][this.end.s].f == -1) {
            this.ctx.font = "48px serif";
            this.ctx.fillStyle = "red";
            this.ctx.textAlign = "center";
            this.ctx.fillText("No Path Found", 10 * UNITE_W, 10 * UNITE_H);
          }
        }
      }
      
    }, DELAY);
  };

  drawPoint(x: number, y: number, color: string = this.nodeColor) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x * UNITE_W, y * UNITE_H, UNITE_W, UNITE_H);
  }
}
