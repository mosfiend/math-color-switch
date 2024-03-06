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
    this.shape.anchor.set(0.5, 0.5);
    const SCALE = 30 / this.shape.width;
    this.shape.scale.set(SCALE, SCALE);
    this.addChild(this.shape);
  }

  update() {}

  activate() {
    this.clear();
    this.shape.clear();
    for (let i = 0; i < Math.random() * 10 + 10; i++) {
      const frag = this.makeFragment();
      this.fragments.push(frag);
      this.addChild(frag);

      Matter.Body.setVelocity(frag.body, {
        x: 5 - Math.random() * 10,
        y: 10 - Math.random() * 20,
      });
    }
    this.imploded = true;
  }
  makeFragment() {
    const clr = [...Manager.colors];
    clr.push(0xcccccc);
    const dim = (1 / Math.sqrt(2)) * this.diam;
    const fragment = new Sprite()
      .beginFill(clr[Math.trunc(Math.random() * 5)])
      .drawCircle(
        this.x + this.sprite.x - 10 + 2 * Math.random() * 10,
        this.y + this.sprite.y - 10 + 2 * Math.random() * 10,
        Math.random() * 4 + 4,
      );

    fragment.body = Matter.Bodies.circle(
      fragment.x + fragment.width / 2,
      fragment.y + fragment.height / 2,
      fragment.width / 2,
      { friction: 0 },
    );
    Matter.World.add(Manager.physics.world, fragment.body);
    return fragment;
  }
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
