import { Container, Graphics } from "pixi.js";
import { Manager } from "../manager";

export class Menu extends Container {
  constructor() {
    super();

    this.screenWidth = Manager.width;
    this.screenHeight = Manager.height;

    this.bg = new Graphics()
      .beginFill(0x000000)
      .drawRect(0, 0, this.screenWidth, this.screenHeight);
    this.bg.y = Manager.app.stage.pivot.y;
    this.bg.alpha = 0.6;
    this.addChild(this.bg);
  }
  update() {}
  resize() {}
}
