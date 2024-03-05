import { Container, Graphics, Sprite, Text, Texture } from "pixi.js";
import { Manager } from "../manager.js";

export class Selection extends Container {
  constructor() {
    super();
    this.plus = new Icon("plus");
    this.minus = new Icon("minus");
    this.times = new Icon("times");
    this.by = new Icon("by");

    this.minus.x = this.plus.width + 10;
    this.times.x = this.minus.width + this.minus.x + 10;
    this.by.x = this.times.width + this.times.x + 10;
    this.addChild(this.plus, this.minus, this.times, this.by);
    this.scale.set(0.3, 0.3);
  }
}
export class Icon extends Sprite {
  constructor(texture) {
    super();
    this.operator = texture;
    this.selected = Manager.arithmetic[texture];
    this.texture = Texture.from(texture);
    this.eventMode = "static";
    this.cursor = "pointer";

    this.on("pointerdown", () => {
      this.select();
    });
  }
  select() {
    if (!this.selected) {
      this.alpha = 1;
      Manager.arithmetic[this.operator] = true;
    } else {
      if (this.checkFalsehood() === 1) return;
      this.alpha = 0.6;
      Manager.arithmetic[this.operator] = false;
    }

    this.selected = !this.selected;
  }
  checkFalsehood() {
    let output = 0;
    for (let operator in Manager.arithmetic) {
      if (Manager.arithmetic[operator]) output++;
    }
    return output;
  }
}
