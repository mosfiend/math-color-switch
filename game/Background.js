import { Container, Graphics } from "pixi.js";
import Matter from "matter-js";
import { Manager } from "../manager";

export class Background extends Container {
  constructor() {
    super();
    this.screenWidth = Manager.width;
    this.screenHeight = Manager.height;
    const bg = new Graphics()
      .beginFill(0xff00ff)
      .drawRect(0, 0, this.screenWidth, this.screenHeight);
    bg.alpha = 0;
    this.addChild(bg);
  }

  update(deltaTime) {}
}
