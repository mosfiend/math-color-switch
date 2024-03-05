import { Container, Graphics, Sprite } from "pixi.js";
import { Manager } from "../manager";
export class ColorChanger extends Container {
  constructor(y) {
    super();
    this.x = Manager.width / 2;
    this.y = y;
    this.clr = Manager.colors;
    this.diam = 27;
    this.mainClr = Manager.colors[Math.trunc(Math.random() * 4)];
    this.shape = new Graphics()
      .lineTo(0, 0)
      .beginFill(this.clr[0])
      .arc(0, 0, this.diam, 0, Math.PI / 2)
      .lineTo(0, 0)
      .beginFill(this.clr[2])
      .arc(0, 0, this.diam, Math.PI / 2, Math.PI)
      .lineTo(0, 0)
      .beginFill(this.clr[1])
      .arc(0, 0, this.diam, Math.PI, (Math.PI * 3) / 2)
      .lineTo(0, 0)
      .beginFill(this.clr[3])
      .arc(0, 0, this.diam, (Math.PI * 3) / 2, Math.PI * 2);
    this.addChild(this.shape);
    this.shape.pivot.set(1, 1);
  }

  update() {
    this.shape.angle += 22.5;
  }
}

export class Star extends Container {
  constructor(y) {
    super();
    this.x = Manager.width / 2;
    this.y = y;
    this.clr = Manager.colors;
    this.shape = Sprite.from("star");
        this.shape.anchor.set(0.5,0.5)
    const SCALE = 30 / this.shape.width;
    this.shape.scale.set(SCALE, SCALE);
    this.addChild(this.shape);
  }

  update() {}
}

export class Sign extends Container {
  constructor(y, sign) {
    super();
    this.x = Manager.width / 2;
    this.y = y;
    this.clr = Manager.colors;
    this.shape = Sprite.from(sign);
    const SCALE = 54 / this.shape.width;
    this.shape.scale.set(SCALE, SCALE);
    this.addChild(this.shape);
  }

  update() {}
}
