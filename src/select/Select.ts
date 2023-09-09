import { BFS } from "../game/BFS/BFS";
import { DFS } from "../game/DFS/DFS";
import { Game } from "../game/Game";

const options: { name: string; onChange: (t: any) => void }[] = [
  {
    name: "None",
    onChange: (game: Game) => {
      game.clear();
    },
  },
  {
    name: "BFS",
    onChange: (game: Game) => {
      game.clear();
      game.bfs = new BFS(game.vis, game.ctx);
    },
  },
  {
    name: "DFS",
    onChange: (game: Game) => {
      game.clear();
      game.dfs = new DFS(game.vis, game.ctx);
    },
  },
];

export class Select {
  selectElement: HTMLSelectElement;
  constructor(public game: Game) {
    this.selectElement = document.getElementById("select") as HTMLSelectElement;
    options.forEach((item) => {
      const newNode = document.createElement("option");
      newNode.value = item.name;
      newNode.text = item.name;
      this.selectElement.appendChild(newNode);
    });
    this.configure();
  }

  configure() {
    this.selectElement.addEventListener("change", () => {
      options
        .find((item) => item.name === this.selectElement.value)
        ?.onChange(this.game);
    });
  }
}
