import { Graphics, Container, RoundedRectangle } from "pixi.js";
import Matter from "matter-js";
import { Manager } from "../manager";
import { Tween } from "tweedle.js";

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
        .drawCircle(0, WIDTH / 2, 11.5);
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

export class ContainedCircles extends Container {
  // The physics is implemented into the graphics object
  constructor(y) {
    super();
    //graphics
    this.screenWidth = Manager.width;
    this.screenHeight = Manager.height;
    this.x = this.screenWidth / 2;
    this.y = y;

    this.curClr = Manager.clr;
    this.idx = Manager.colors.indexOf(this.curClr);
    this.clr = Manager.colors;

    const WIDTH = 170;
    this.W = WIDTH / 2;
    this.W2 = WIDTH / 2 + 20;
    this.diam = 16;
    this.space = (WIDTH + this.diam * 2) * 2;
    this.y -= this.space;
    this.shape1 = new Graphics()
      .lineStyle(this.diam, this.clr[this.idx])
      .arc(this.W, this.W, this.W, 0, Math.PI / 2 + 0.1)
      .lineStyle(this.diam, this.clr[(this.idx + 1) % 4])
      .arc(this.W, this.W, this.W, Math.PI / 2, Math.PI + 0.1)
      .lineStyle(this.diam, this.clr[(this.idx + 2) % 4])
      .arc(this.W, this.W, this.W, Math.PI, (Math.PI * 3) / 2 + 0.1)
      .lineStyle(this.diam, this.clr[(this.idx + 3) % 4])
      .arc(this.W, this.W, this.W, (Math.PI * 3) / 2, Math.PI * 2);
    // this.shape1.angle=90
    this.shape2 = new Graphics()
      .lineStyle(this.diam, this.clr[(this.idx + 3) % 4])
      .arc(this.W, this.W, this.W2, 0, Math.PI / 2 + 0.1)
      .lineStyle(this.diam, this.clr[this.idx])
      .arc(this.W, this.W, this.W2, Math.PI / 2, Math.PI + 0.1)
      .lineStyle(this.diam, this.clr[(this.idx + 1) % 4])
      .arc(this.W, this.W, this.W2, Math.PI, (Math.PI * 3) / 2 + 0.1)
      .lineStyle(this.diam, this.clr[(this.idx + 2) % 4])
      .arc(this.W, this.W, this.W2, (Math.PI * 3) / 2, Math.PI * 2);

    // this.shape2.y = WIDTH + this.diam;
    this.body = {
      type: "superposing",
      clr1: this.clr[this.idx],
      clr2: this.clr[(this.idx + 3) % 4],
    };
    // this.addChild(this.shape1,this.shape2,this.shape3.this.shape4)
    this.addChild(this.shape1, this.shape2);
    //physics
    // this.body = Matter.Bodies.rectangle(
    //   0,
    //   this.screenHeight - 10,
    //   this.screenWidth,
    //   10,
    //   { friction: 0, isStatic: true },
    // );
    // Matter.World.add(Manager.physics.world, this.body);
    // this.body.gamePlatform = this; // why am i using this

    this.shape1.pivot.set(WIDTH / 2, WIDTH / 2);
    this.shape2.pivot.set(WIDTH / 2, WIDTH / 2);
    this.dx = 1;
    this.dy = 10;
  }
  update(deltaTime) {
    if (this.curClr !== Manager.clr) {
      this.calibrateClr();
    }
    this.shape1.angle = (this.shape1.angle + 1) % 360;
    this.shape2.angle = (this.shape2.angle - 1 + 360) % 360;
    if (this.shape1.angle < 90) {
      this.body.clr1 = this.clr[this.idx];
      this.body.clr2 = this.clr[(this.idx + 1) % 4];
    } else if (this.shape1.angle < 180) {
      this.body.clr1 = this.clr[(this.idx + 1) % 4];
      this.body.clr2 = this.clr[this.idx + (1 % 4)];
    } else if (this.shape1.angle < 270) {
      this.body.clr1 = this.clr[(this.idx + 1) % 4];
      this.body.clr2 = this.clr[this.idx];
    } else {
      this.body.clr1 = this.clr[(this.idx + 1) % 4];
      this.body.clr2 = this.clr[(this.idx + 1) % 4];
    }
  }

  calibrateClr() {
    this.curClr = Manager.clr;
    this.idx = Manager.colors.indexOf(this.curClr);
    if (this.idx === -1) return;
    this.shape1
      .clear()
      .lineStyle(this.diam, this.clr[this.idx])
      .arc(this.W, this.W, this.W, 0, Math.PI / 2 + 0.1)
      .lineStyle(this.diam, this.clr[(this.idx + 1) % 4])
      .arc(this.W, this.W, this.W, Math.PI / 2, Math.PI + 0.1)
      .lineStyle(this.diam, this.clr[(this.idx + 2) % 4])
      .arc(this.W, this.W, this.W, Math.PI, (Math.PI * 3) / 2 + 0.1)
      .lineStyle(this.diam, this.clr[(this.idx + 3) % 4])
      .arc(this.W, this.W, this.W, (Math.PI * 3) / 2, Math.PI * 2);
    // this.shape1.angle=90
    this.shape2
      .clear()
      .lineStyle(this.diam, this.clr[(this.idx + 3) % 4])
      .arc(this.W, this.W, this.W2, 0, Math.PI / 2 + 0.1)
      .lineStyle(this.diam, this.clr[this.idx])
      .arc(this.W, this.W, this.W2, Math.PI / 2, Math.PI + 0.1)
      .lineStyle(this.diam, this.clr[(this.idx + 1) % 4])
      .arc(this.W, this.W, this.W2, Math.PI, (Math.PI * 3) / 2 + 0.1)
      .lineStyle(this.diam, this.clr[(this.idx + 2) % 4])
      .arc(this.W, this.W, this.W2, (Math.PI * 3) / 2, Math.PI * 2);

    // this.shape2.y = WIDTH + this.diam;
    this.body.clr1 = this.clr[this.idx];
    this.body.clr2 = this.clr[(this.idx + 3) % 4];
  }

  detectCollision(hero, lose) {
    const y = hero.y + hero.sprite.y;
    const y1 = this.y + this.shape1.y + this.W;
    const y2 = this.y + this.shape1.y - this.W;
    if (
      ((y > y1 && y < y1 + this.diam) ||
        (y + hero.height > y1 && y + hero.height < y1 + this.diam)) &&
      hero.body.clr !== this.body.clr1
    ) {
      lose();
    }
    if (
      ((y > y2 && y < y2 + this.diam) ||
        (y + hero.height > y2 && y + hero.height < y2 + this.diam)) &&
      hero.body.clr !== this.body.clr2
    ) {
      lose();
    }
    const ye1 = this.y + this.shape2.y + this.W2;
    const ye2 = this.y + this.shape2.y - this.W2;
    if (
      ((y > ye1 && y < ye1 + this.diam) ||
        (y + hero.height > ye1 && y + hero.height < ye1 + this.diam)) &&
      hero.body.clr !== this.body.clr1
    ) {
      lose();
    }
    if (
      ((y > ye2 && y < ye2 + this.diam) ||
        (y + hero.height > ye2 && y + hero.height < ye2 + this.diam)) &&
      hero.body.clr !== this.body.clr2
    ) {
      lose();
    }
  }
}

export class DoubleSmallCircles extends Container {
  // The physics is implemented into the graphics object
  constructor(y) {
    super();
    //graphics
    this.screenWidth = Manager.width;
    this.screenHeight = Manager.height;
    this.x = this.screenWidth / 2;
    const WIDTH = 170;
    this.y = y - WIDTH * 2;

    this.curClr = Manager.clr;
    this.idx = Manager.colors.indexOf(this.curClr);
    this.clr = Manager.colors;

    this.W = WIDTH / 2;
    this.W2 = WIDTH / 2 + 30;
    this.diam = 16;
    // this.space = (WIDTH + this.diam * 2) * 2;
    // this.y -= this.space;

    this.shape1 = new Graphics()
      .lineStyle(this.diam, this.clr[this.idx])
      .drawCircle(0, 0, this.W);

    this.circles1 = new Container();

    for (let i = 0; i < 24; i++) {
      const circle = new Graphics()
        .beginFill(this.clr[(this.idx + Math.floor(i / 6)) % 4])
        .drawCircle(0, WIDTH / 2, 11.5);
      circle.angle = -90 + 15 * i;
      this.circles1.addChild(circle);
    }
    this.addChild(this.circles1);

    this.shape2 = new Graphics()
      .lineStyle(this.diam, this.clr[this.idx])
      .drawCircle(0, 0, this.W2);

    this.circles2 = new Container();
    for (let i = 0; i < 24; i++) {
      const circle = new Graphics()
        .beginFill(this.clr[(this.idx + Math.floor(i / 6)) % 4])
        .drawCircle(0, this.W2, 14);
      circle.angle = 15 * i;
      this.circles2.addChild(circle);
    }
    this.addChild(this.circles2);
    // this.shape2.y = WIDTH + this.diam;
    this.body = {
      type: "superposing",
      clr1: this.clr[this.idx],
      clr2: this.clr[(this.idx + 3) % 4],
    };
    // this.addChild(this.shape1,this.shape2,this.shape3.this.shape4)
    //physics
    // this.body = Matter.Bodies.rectangle(
    //   0,
    //   this.screenHeight - 10,
    //   this.screenWidth,
    //   10,
    //   { friction: 0, isStatic: true },
    // );
    // Matter.World.add(Manager.physics.world, this.body);
    // this.body.gamePlatform = this; // why am i using this

    // this.addChild(this.shape2, this.shape1);
    // Math.sin(Math.PI / 3) * WIDTH;
    this.shape1.pivot.set(WIDTH / 2, WIDTH / 2);
    this.shape2.pivot.set(WIDTH / 2, WIDTH / 2);
    // this.circles1.pivot.set(WIDTH / 2, WIDTH / 2);
    // this.circles2.pivot.set(WIDTH / 2, WIDTH / 2);
    this.dx = 1;
    this.dy = 10;
  }
  update(deltaTime) {
    // if (this.curClr !== Manager.clr) {
    this.calibrateClr();
    // }
    this.circles1.angle = (this.circles1.angle + 1.35) % 360;
    this.circles2.angle = (this.circles2.angle - 1.35 + 360) % 360;
    if (this.circles1.angle < 90) {
      this.body.clr1 = this.clr[this.idx];
      this.body.clr2 = this.clr[(this.idx + 1) % 4];
    } else if (this.circles1.angle < 180) {
      this.body.clr1 = this.clr[(this.idx + 1) % 4];
      this.body.clr2 = this.clr[this.idx + (1 % 4)];
    } else if (this.circles1.angle < 270) {
      this.body.clr1 = this.clr[(this.idx + 1) % 4];
      this.body.clr2 = this.clr[this.idx];
    } else {
      this.body.clr1 = this.clr[(this.idx + 1) % 4];
      this.body.clr2 = this.clr[(this.idx + 1) % 4];
    }
  }

  calibrateClr() {
    if (this.curClr === Manager.clr) return;
    this.curClr = Manager.clr;
    this.idx = Manager.colors.indexOf(this.curClr);
    if (this.idx === -1) return;
    this.shape1
      .lineStyle(this.diam, this.clr[this.idx])
      .arc(this.W, this.W, this.W, 0, Math.PI / 2 + 0.1)
      .lineStyle(this.diam, this.clr[(this.idx + 1) % 4])
      .arc(this.W, this.W, this.W, Math.PI / 2, Math.PI + 0.1)
      .lineStyle(this.diam, this.clr[(this.idx + 2) % 4])
      .arc(this.W, this.W, this.W, Math.PI, (Math.PI * 3) / 2 + 0.1)
      .lineStyle(this.diam, this.clr[(this.idx + 3) % 4])
      .arc(this.W, this.W, this.W, (Math.PI * 3) / 2, Math.PI * 2);
    // this.shape1.angle=90
    this.shape2
      .lineStyle(this.diam, this.clr[(this.idx + 3) % 4])
      .arc(this.W, this.W, this.W2, 0, Math.PI / 2 + 0.1)
      .lineStyle(this.diam, this.clr[this.idx])
      .arc(this.W, this.W, this.W2, Math.PI / 2, Math.PI + 0.1)
      .lineStyle(this.diam, this.clr[(this.idx + 1) % 4])
      .arc(this.W, this.W, this.W2, Math.PI, (Math.PI * 3) / 2 + 0.1)
      .lineStyle(this.diam, this.clr[(this.idx + 2) % 4])
      .arc(this.W, this.W, this.W2, (Math.PI * 3) / 2, Math.PI * 2);

    for (let i = 0; i < 24; i++) {
      const circle = new Graphics()
        .beginFill(this.clr[(this.idx + Math.floor(i / 6)) % 4])
        .drawCircle(0, this.W, 11.5);
      circle.angle = -90 + 15 * i;
      this.circles1.addChild(circle);
    }
    for (let i = 0; i < 24; i++) {
      const circle = new Graphics()
        .beginFill(this.clr[(this.idx + Math.floor(i / 6)) % 4])
        .drawCircle(0, this.W2, 14);
      circle.angle = 15 * i;
      this.circles2.addChild(circle);
    }
    // this.shape2.y = WIDTH + this.diam;
    this.body.clr1 = this.clr[this.idx];
    this.body.clr2 = this.clr[(this.idx + 3) % 4];
  }

  detectCollision(hero, lose) {
    const y = hero.y + hero.sprite.y;
    const y1 = this.y + this.shape1.y + this.W;
    const y2 = this.y + this.shape1.y - this.W;
    if (
      ((y > y1 && y < y1 + this.diam) ||
        (y + hero.height > y1 && y + hero.height < y1 + this.diam)) &&
      hero.body.clr !== this.body.clr1
    ) {
      lose();
    }
    if (
      ((y > y2 && y < y2 + this.diam) ||
        (y + hero.height > y2 && y + hero.height < y2 + this.diam)) &&
      hero.body.clr !== this.body.clr2
    ) {
      lose();
    }
    this.addChild(
      new Graphics().beginFill(0x0000ff).drawRect(-100, y1, 400, 3),
      new Graphics()
        .beginFill(0x0000ff)
        .drawRect(-100, y1 + this.diam - this.W * 2, 400, 3),
    );
    const ye1 = this.y + this.shape2.y + this.W2;
    const ye2 = this.y + this.shape2.y - this.W2;
    if (
      ((y > ye1 && y < ye1 + this.diam) ||
        (y + hero.height > ye1 && y + hero.height < ye1 + this.diam)) &&
      hero.body.clr !== this.body.clr1
    ) {
      lose();
    }
    if (
      ((y > ye2 && y < ye2 + this.diam) ||
        (y + hero.height > ye2 && y + hero.height < ye2 + this.diam)) &&
      hero.body.clr !== this.body.clr2
    ) {
      lose();
    }
  }
}

export class Square2 extends Container {
  // The physics is implemented into the graphics object
  constructor(y) {
    super();
    //graphics
    this.screenWidth = Manager.width;
    this.screenHeight = Manager.height;
    this.x = this.screenWidth / 2;
    const HEIGHT = 20;
    const WIDTH = 150 + HEIGHT;
    this.y = y - WIDTH * 2;

    this.curClr = Manager.clr;
    this.idx = Manager.colors.indexOf(this.curClr);
    this.clr = Manager.colors;

    this.W = WIDTH;
    this.diam = 16;
    // this.space = (WIDTH + this.diam * 2) * 2;
    // this.y -= this.space;

    this.shape1 = new Graphics();
    // .lineStyle(3, this.clr[this.idx])
    // .drawRect(0, 0, this.W, this.W);

    this.circles = [];

    for (let i = 0; i < 20; i++) {
      const circle = new Graphics()
        .beginFill(this.clr[Math.floor(i / 5) % 4])
        .drawCircle(0, 0, 14);
      if (i < 5) {
        circle.x = this.W - (this.W / 5) * i;
        circle.y = 0;
      } else if (i < 10) {
        circle.x = this.W;
        circle.y = this.W - (this.W / 5) * (i % 5);
      } else if (i < 15) {
        circle.x = (this.W / 5) * (i % 5);
        circle.y = this.W;
      } else {
        circle.x = 0;
        circle.y = (this.W / 5) * (i % 5);
      }

      this.shape1.addChild(circle);
      this.circles.push(circle);
    }

    this.addChild(this.shape1);

    // drawRoundedRect(0, 0, WIDTH + HEIGHT, HEIGHT, 15);

    // this.shape2.y = WIDTH + this.diam;
    this.body = {
      type: "superposing",
      clr1: this.clr[0],
      clr2: this.clr[2],
    };
    // this.addChild(this.shape1,this.shape2,this.shape3.this.shape4)
    //physics
    // this.body = Matter.Bodies.rectangle(
    //   0,
    //   this.screenHeight - 10,
    //   this.screenWidth,
    //   10,
    //   { friction: 0, isStatic: true },
    // );
    // Matter.World.add(Manager.physics.world, this.body);
    // this.body.gamePlatform = this; // why am i using this
    // this.addChild(this.shape2, this.shape1);
    // Math.sin(Math.PI / 3) * WIDTH;
    this.shape1.pivot.set(WIDTH / 2, WIDTH / 2);
    // this.circles1.pivot.set(WIDTH / 2, WIDTH / 2);
    // this.circles2.pivot.set(WIDTH / 2, WIDTH / 2);
    this.dx = 1;
    this.dy = 10;
    this.move(0);
    this.move(5);
    this.move(10);
    this.move(15);
  }
  update(deltaTime) {}

  detectCollision(hero, lose) {
    const y = hero.y + hero.sprite.y;
    const y1 = this.y + this.W / 2;
    const y2 = this.y - this.W / 2;
    if (
      ((y > y1 && y < y1 + this.diam) ||
        (y + hero.height > y1 && y + hero.height < y1 + this.diam)) &&
      hero.body.clr !== this.body.clr1
    ) {
      lose();
    }
    if (
      ((y > y2 && y < y2 + this.diam) ||
        (y + hero.height > y2 && y + hero.height < y2 + this.diam)) &&
      hero.body.clr !== this.body.clr2
    ) {
      lose();
    }
  }

  move(idx) {
    const clr = this.clr;
    const circle = this.circles[idx];
    const body = this.body;

    function move1(circles) {
      const tween = new Tween(circle)
        .to(
          {
            x: 170,
          },
          750,
        )
        .onUpdate(() => {
          for (let i = 1; i < 5; i++) {
            const curCircle = circles[idx + i];
            const dist = circle.x - (170 / 5) * i;
            curCircle.x = Math.max(dist, 0);
            curCircle.y = Math.max(0, -dist);
          }
          if (circle.x >= 170 / 2 - 14) {
            body.clr2 = clr[idx / 5];
            body.clr1 = clr[(idx / 5 + 2) % 4];
          }
        })
        .onComplete(() => {
          move2(circles);
        });
      return tween.start();
    }

    function move2(circles) {
      const tween = new Tween(circle)
        .to(
          {
            y: 170,
          },
          750,
        )
        .onUpdate(() => {
          for (let i = 1; i < 5; i++) {
            const curCircle = circles[idx + i];
            const dist = circle.y - (170 / 5) * i;
            curCircle.y = Math.max(dist, 0);
            curCircle.x = Math.min(170 + dist, 170);
          }
        })
        .onComplete(() => {
          move3(circles);
        });
      return tween.start();
    }

    function move3(circles) {
      const tween = new Tween(circle)
        .to(
          {
            x: 0,
          },
          750,
        )
        .onUpdate(() => {
          for (let i = 1; i < 5; i++) {
            const curCircle = circles[idx + i];
            const dist = circle.x + (170 / 5) * i;
            curCircle.x = Math.min(dist, 170);
            curCircle.y = Math.min(170 - (dist - 170), 170);
          }
        })
        .onComplete(() => {
          move4(circles);
        });
      return tween.start();
    }

    function move4(circles) {
      const tween = new Tween(circle)
        .to(
          {
            y: 0,
          },
          750,
        )
        .onUpdate(() => {
          for (let i = 1; i < 5; i++) {
            const curCircle = circles[idx + i];
            const dist = circle.y + (170 / 5) * i;
            curCircle.y = Math.min(dist, 170);
            curCircle.x = Math.max(dist - 170, 0);
          }
        })
        .onComplete(() => {
          move1(circles);
        });
      return tween.start();
    }

    if (idx === 0) {
      move1(this.circles);
    } else if (idx === 5) {
      move2(this.circles);
    } else if (idx === 10) {
      move3(this.circles);
    } else if (idx === 15) {
      move4(this.circles);
    }
  }
}

// How do we make this function?
//
// the first circle leads the way for the all the remaining circles, (indexes: 0, 5, 10)
// the other circles must always be at an equal distance from this circle
// in move1 and move2:
//
//
// in move3 and move4 (slightly more complicated, because we are moving in a negative direction)
//
//
//
// The distance between two points is always going to equal to W/5*idx
// move1
// x = X0 - (y-)
