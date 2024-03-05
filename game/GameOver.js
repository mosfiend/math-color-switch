import { Menu } from "./Menu";
import { Selection } from "./Buttons";

export class GameOver extends Menu {
  constructor() {
    super();
    this.selection = new Selection();
    this.selection.x = this.screenWidth / 2 - this.selection.width / 2;
    this.addChild(this.selection);
  }
}
