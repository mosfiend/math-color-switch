import { Graphics, Container, RoundedRectangle } from "pixi.js";
import Matter from "matter-js";
import { Manager } from "../manager";

export class SmallCircles extends Container {
  // The physics is implemented into the graphics object

  constructor(y) {
    super();
    //graphics
    const HEIGHT = 20;
    const WIDTH = 190;
    this.screenWidth = Manager.width;
    this.screenHeight = Manager.height;
    this.x = this.screenWidth / 2;
    this.y = y - WIDTH;
    this.clr = Manager.colors;

    this.W = WIDTH;
    this.diam = HEIGHT;
    // this.y -= this.space;
    this.shape1 = new Graphics()
      .lineStyle(1, this.clr[0])
      .drawCircle(0, 0, WIDTH / 2);
    this.circles = [];

    for (let i = 0; i < 24; i++) {
      const circle = new Graphics()
        .beginFill(this.clr[Math.floor(i / 6)])
        .drawCircle(0, WIDTH / 2, 10);
      circle.angle = 270 + 15 * i;
      this.circles.push(circle);
    }

    this.addChild(...this.circles);
    // this.pivot.set(WIDTH / 2 + HEIGHT / 2, WIDTH / 2 + HEIGHT / 2);

    this.body = {
      type: "circle",
      clr1: this.clr[0],
      clr2: this.clr[2],
    };
  }

  update(deltaTime) {
    this.angle = (this.angle + 1.4) % 360;
    if (this.angle < 90) {
      this.body.clr1 = this.clr[2];
      this.body.clr2 = this.clr[0];
    } else if (this.angle < 180) {
      this.body.clr1 = this.clr[1];
      this.body.clr2 = this.clr[3];
    } else if (this.angle < 270) {
      this.body.clr1 = this.clr[0];
      this.body.clr2 = this.clr[2];
    } else {
      this.body.clr1 = this.clr[3];
      this.body.clr2 = this.clr[1];
    }
  }
}
