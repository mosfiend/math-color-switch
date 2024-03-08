import { Graphics, Sprite } from "pixi.js";
import { Menu } from "./Menu";
import { Selection } from "./Buttons";
import { Manager } from "../manager";

export class GameOver extends Menu {
  constructor(cb) {
    super();
    this.screenWidth = Manager.width;
    this.screenHeight = Manager.height;
    this.bg = new Graphics()
      .beginFill(0x2e3037)
      .drawRect(0, 0, this.screenWidth, this.screenHeight);
    this.selection = new Selection();
    this.selection.x = this.screenWidth / 2 - this.selection.width / 2;
    this.selection.y = 5;
    this.border = new Graphics()
      .beginFill(0xcee7e1)
      .drawRect(0, 0, this.screenWidth, 92);
    this.again = Sprite.from("again");
    this.again.width = 80;
    this.again.height = 80;
    this.again.x = this.screenWidth / 2 - this.again.width / 2;
    this.again.y = 120;

    this.again.eventMode = "static";
    this.again.cursor = "pointer";
    this.again.on("pointerdown", () => {
      cb();
    });
    this.addChild(this.border, this.selection, this.again);
  }
}
