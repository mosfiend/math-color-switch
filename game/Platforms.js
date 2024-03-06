import { Graphics, Container, RoundedRectangle } from "pixi.js";
import Matter from "matter-js";
import { Manager } from "../manager";

export class Square extends Container {
  // The physics is implemented into the graphics object
  constructor(y) {
    super();
    //graphics
    this.screenWidth = Manager.width;
    this.screenHeight = Manager.height;
    this.x = this.screenWidth / 2;
    this.y = y;
    this.clr = Manager.colors;
    const HEIGHT = 25;
    const WIDTH = 270 + HEIGHT;
    this.W = WIDTH;
    this.diam = HEIGHT;
    this.shape1 = new Graphics()
      .beginFill(this.clr[0])
      .drawRoundedRect(0, 0, WIDTH + HEIGHT, HEIGHT, 15);
    this.shape2 = new Graphics()
      .beginFill(this.clr[1])
      .drawRoundedRect(0, 0, HEIGHT, WIDTH + HEIGHT, 15);
    this.shape2.x = this.shape1.width - HEIGHT;
    this.shape3 = new Graphics()
      .beginFill(this.clr[2])
      .drawRoundedRect(0, 0, WIDTH + HEIGHT, HEIGHT, 15);
    this.shape3.y = this.shape2.height - HEIGHT;
    this.shape4 = new Graphics()
      .beginFill(this.clr[3])
      .drawRoundedRect(0, 0, HEIGHT, WIDTH + HEIGHT, 15);

    this.shape1Bis = new Graphics()
      .beginFill(this.clr[0])
      .drawRoundedRect(0, 0, WIDTH / 2 + HEIGHT, HEIGHT, 15);
    this.addChild(
      this.shape1,
      this.shape2,
      this.shape3,
      this.shape4,
      this.shape1Bis,
    );
    this.pivot.set(WIDTH / 2 + HEIGHT / 2, WIDTH / 2 + HEIGHT / 2);

    this.body = Matter.Composite.create();
    this.bod1 = Matter.Bodies.rectangle(
      this.shape1.x + this.x - this.pivot.x + this.shape1.width / 2,
      this.shape1.y + this.y - this.pivot.y + this.shape1.height / 2,
      this.shape1.width,
      this.shape1.height,
      { friction: 0, isStatic: true, isSensor: true },
    );
    this.bod2 = Matter.Bodies.rectangle(
      this.shape2.x + this.x - this.pivot.x + this.shape2.width / 2,
      this.shape2.y + this.y - this.pivot.y + this.shape2.height / 2,
      this.shape2.width,
      this.shape2.height,
      { friction: 0, isStatic: true, isSensor: true },
    );
    this.bod3 = Matter.Bodies.rectangle(
      this.shape3.x + this.x - this.pivot.x + this.shape3.width / 2,
      this.shape3.y + this.y - this.pivot.y + this.shape3.height / 2,
      this.shape3.width,
      this.shape3.height,
      { friction: 0, isStatic: true, isSensor: true },
    );
    this.bod4 = Matter.Bodies.rectangle(
      this.shape4.x + this.x - this.pivot.x + this.shape4.width / 2,
      this.shape4.y + this.y - this.pivot.y + this.shape4.height / 2,
      this.shape4.width,
      this.shape4.height,
      { friction: 0, isStatic: true, isSensor: true },
    );
    this.bod1.clr = this.clr[0];
    this.bod2.clr = this.clr[1];
    this.bod3.clr = this.clr[2];
    this.bod4.clr = this.clr[3];
    Matter.Composite.add(this.body, [
      this.bod1,
      this.bod2,
      this.bod3,
      this.bod4,
    ]);

    Matter.World.add(Manager.physics.world, this.body);
  }

  update(deltaTime) {
    // Matter.Body.setAngle(this.body, (this.angle / 180) * Math.PI);
    // // this.shape.angle = (this.body.angle * 180) / Math.PI;
    // this.sprite.x = this.body.position.x;
    // this.sprite.y = this.body.position.y;
    //
    Matter.Composite.rotate(this.body, 0.02, {
      x: this.screenWidth / 2,
      y: this.y,
    });
    this.angle = ((this.bod1.angle / Math.PI) * 180) % 360;
    // // Matter.Body.setAngle(this.roofTile.body, Math.PI / 4);
    // const anga = (this.body.angle / Math.PI) * 180;
    // this.sprite.angle = anga;
  }
}

export class Triangle extends Container {
  // The physics is implemented into the graphics object
  constructor(y) {
    super();
    //graphics
    this.screenWidth = Manager.width;
    this.screenHeight = Manager.height;
    this.x = this.screenWidth / 2;
    this.y = y;
    this.clr = [...Manager.colors];
    this.clr.splice(Math.trunc(Math.random() * 4), 1);
    const HEIGHT = 20;
    const WIDTH = 270 + HEIGHT;
    this.shape1 = new Graphics()
      .beginFill(this.clr[0])
      .drawRoundedRect(0, 0, WIDTH, HEIGHT, 20);
    this.shape2 = new Graphics()
      .beginFill(this.clr[1])
      .drawRoundedRect(0, 0, WIDTH, HEIGHT, HEIGHT, 20);
    this.shape3 = new Graphics()
      .beginFill(this.clr[2])
      .drawRoundedRect(0, 0, WIDTH, HEIGHT, 20);
    this.shape2.angle = 60;
    this.shape3.angle = -60;
    this.shape3.x = Math.cos(Math.PI / 3) * WIDTH;
    this.shape3.y = Math.sin(Math.PI / 3) * WIDTH;
    this.addChild(this.shape1, this.shape3, this.shape2);
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

    this.addChild(
      new Graphics()
        .beginFill(0xff0000)
        .drawCircle(WIDTH / 2 - HEIGHT, WIDTH / 2, 31),
    );

    this.pivot
      .set
      // WIDTH / 2-HEIGHT,
      // WIDTH / 2 - HEIGHT,
      ();
    this.dx = 1;
    this.dy = 10;
  }
  update(deltaTime) {
    // this.angle += 1;
  }
}

export class Circle extends Container {
  // The physics is implemented into the graphics object
  constructor(y) {
    super();
    //graphics
    this.screenWidth = Manager.width;
    this.screenHeight = Manager.height;
    this.x = this.screenWidth / 2;
    this.y = y;
    this.clr = Manager.colors;

    this.body = {
      type: "circle",
      clr1: this.clr[0],
      clr2: this.clr[2],
    };

    const WIDTH = 190;
    this.W = WIDTH;
    this.diam = 20;
    this.shape1 = new Graphics()
      .lineStyle(this.diam, this.clr[0])
      .arc(WIDTH / 2, WIDTH / 2, WIDTH / 2, -0.01, Math.PI / 2 + 0.1)
      .lineStyle(this.diam, this.clr[1])
      .arc(WIDTH / 2, WIDTH / 2, WIDTH / 2, Math.PI / 2, Math.PI + 0.1)
      .lineStyle(this.diam, this.clr[2])
      .arc(WIDTH / 2, WIDTH / 2, WIDTH / 2, Math.PI, (Math.PI * 3) / 2 + 0.1)
      .lineStyle(this.diam, this.clr[3])
      .arc(WIDTH / 2, WIDTH / 2, WIDTH / 2, (Math.PI * 3) / 2, Math.PI * 2);

    this.addChild(this.shape1);

    Math.sin(Math.PI / 3) * WIDTH;
    this.pivot.set(WIDTH / 2, WIDTH / 2);
    this.dx = 1;
    this.dy = 10;
    this.idx1 = 0;
    this.idx2 = 2;
  }
  update(deltaTime) {
    this.angle = (this.angle + 1) % 360;
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

export class DoubleCircle extends Container {
  // The physics is implemented into the graphics object
  constructor(y) {
    super();
    //graphics
    this.screenWidth = Manager.width;
    this.screenHeight = Manager.height;
    this.x = this.screenWidth / 2;
    this.y = y;
    this.clr = Manager.colors;
    const WIDTH = this.screenWidth / 4;
    this.shape1 = new Graphics()
      .lineStyle(22, this.clr[0])
      .arc(WIDTH / 4, WIDTH / 4, WIDTH / 4, 0, Math.PI / 2)
      .lineStyle(22, this.clr[1])
      .arc(WIDTH / 4, WIDTH / 4, WIDTH / 4, Math.PI / 2, Math.PI)
      .lineStyle(22, this.clr[2])
      .arc(WIDTH / 4, WIDTH / 4, WIDTH / 4, Math.PI, (Math.PI * 3) / 2)
      .lineStyle(22, this.clr[3])
      .arc(WIDTH / 4, WIDTH / 4, WIDTH / 4, (Math.PI * 3) / 2, Math.PI * 2);
    // this.shape1.angle=90
    this.shape2 = new Graphics()
      .lineStyle(22, this.clr[3])
      .arc(WIDTH / 4, WIDTH / 4, WIDTH / 4, 0, Math.PI / 2)
      .lineStyle(22, this.clr[2])
      .arc(WIDTH / 4, WIDTH / 4, WIDTH / 4, Math.PI / 2, Math.PI)
      .lineStyle(22, this.clr[1])
      .arc(WIDTH / 4, WIDTH / 4, WIDTH / 4, Math.PI, (Math.PI * 3) / 2)
      .lineStyle(22, this.clr[0])
      .arc(WIDTH / 4, WIDTH / 4, WIDTH / 4, (Math.PI * 3) / 2, Math.PI * 2);

    this.body = {
      type: "doubleCircle",
      clr1: 0,
      clr2: 2,
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
    this.shape2.y = WIDTH / 2 + 30;

    Math.sin(Math.PI / 3) * WIDTH;
    this.shape1.pivot.set(WIDTH / 4, WIDTH / 4);
    this.shape2.pivot.set(WIDTH / 4, WIDTH / 4);
    this.dx = 1;
    this.dy = 10;
  }
  update(deltaTime) {
    this.shape1.angle += 1;
    this.shape2.angle -= 1;
  }
}
