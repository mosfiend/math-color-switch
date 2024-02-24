import { Graphics, Container } from "pixi.js";
import Matter from "matter-js";
import { Manager } from "../manager";
export class PlatBuffer extends Container {
  constructor() {
    super();
    this.screenWidth = Manager.width;
    this.screenHeight = Manager.height;
  }

  update(deltaTime) {}

  get(idx) {}

  set(idx, height, clr) {}
}

export class Square extends Container {
  // The physics is implemented into the graphics object
  constructor(x, y, width, height, clr) {
    super();
    //graphics
    this.screenWidth = Manager.width;
    this.screenHeight = Manager.height;
    this.x = x;
    this.y = y;
    this.clr = Manager.colors;
    const WIDTH = this.screenWidth / 4;
    this.shape1 = new Graphics()
      .beginFill(this.clr[0])
      .drawRect(0, 0, WIDTH, 20);
    this.shape2 = new Graphics()
      .beginFill(this.clr[1])
      .drawRect(0, 0, 20, WIDTH);
    this.shape2.x = this.shape1.width - 20;
    this.shape3 = new Graphics()
      .beginFill(this.clr[2])
      .drawRect(0, 0, WIDTH, 20);
    this.shape3.y = this.shape2.height;
    this.shape4 = new Graphics()
      .beginFill(this.clr[3])
      .drawRect(0, 0, 20, WIDTH);
    this.addChild(this.shape1, this.shape2, this.shape3, this.shape4);
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
    this.pivot.set(this.screenWidth / 8, this.screenWidth / 8);
    this.dx = 1;
    this.dy = 10;
  }
  update(deltaTime) {
    this.angle += 1;
  }
}

export class Triangle extends Container {
  // The physics is implemented into the graphics object
  constructor(x, y, width, height, clr) {
    super();
    //graphics
    this.screenWidth = Manager.width;
    this.screenHeight = Manager.height;
    this.x = x;
    this.y = y;
    this.clr = [...Manager.colors];
    this.clr.splice(Math.trunc(Math.random() * 4), 1);
    console.log(this.clr);
    const WIDTH = this.screenWidth / 4;
    this.shape1 = new Graphics()
      .beginFill(this.clr[0])
      .drawRect(0, 0, WIDTH, 20);
    this.shape2 = new Graphics()
      .beginFill(this.clr[1])
      .drawRect(0, 0, WIDTH + 28, 20);
    this.shape3 = new Graphics()
      .beginFill(this.clr[2])
      .drawRect(0, 0, WIDTH + 20, 20);
    this.shape2.angle = 60;
    this.shape3.angle = -60;
    this.shape3.x = Math.cos(Math.PI / 3) * (WIDTH - 20);
    this.shape3.y = Math.sin(Math.PI / 3) * (WIDTH + 20);
    this.addChild(this.shape1, this.shape3, this.shape2);
    console.log(this.shape3.x, Math.cos(Math.PI / 3) * WIDTH);
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

    Math.sin(Math.PI / 3) * WIDTH;
    this.pivot.set(WIDTH / 2, WIDTH / 2);
    this.dx = 1;
    this.dy = 10;
  }
  update(deltaTime) {
    this.angle += 1;
  }
}

export class Circle extends Container {
  // The physics is implemented into the graphics object
  constructor(x, y, width, height, clr) {
    super();
    //graphics
    this.screenWidth = Manager.width;
    this.screenHeight = Manager.height;
    this.x = x;
    this.y = y;
    this.clr = Manager.colors;
    const WIDTH = this.screenWidth / 4;
    this.shape1 = new Graphics()
      .lineStyle(25, this.clr[0])
      .arc(WIDTH / 2, WIDTH / 2, WIDTH / 2, 0, Math.PI / 2)
      .lineStyle(25, this.clr[1])
      .arc(WIDTH / 2, WIDTH / 2, WIDTH / 2, Math.PI / 2, Math.PI)
      .lineStyle(25, this.clr[2])
      .arc(WIDTH / 2, WIDTH / 2, WIDTH / 2, Math.PI, (Math.PI * 3) / 2)
      .lineStyle(25, this.clr[3])
      .arc(WIDTH / 2, WIDTH / 2, WIDTH / 2, (Math.PI * 3) / 2, Math.PI * 2);

    // this.addChild(this.shape1,this.shape2,this.shape3.this.shape4)
    this.addChild(this.shape1);
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

    Math.sin(Math.PI / 3) * WIDTH;
    this.pivot.set(WIDTH / 2, WIDTH / 2);
    this.dx = 1;
    this.dy = 10;
  }
  update(deltaTime) {
    this.angle += 1;
  }
}

export class DoubleCircle extends Container {
  // The physics is implemented into the graphics object
  constructor(x, y, width, height, clr) {
    super();
    //graphics
    this.screenWidth = Manager.width;
    this.screenHeight = Manager.height;
    this.x = x;
    this.y = y;
    this.clr = Manager.colors;
    const WIDTH = this.screenWidth / 4;
    this.shape1 = new Graphics()
      .lineStyle(25, this.clr[0])
      .arc(WIDTH / 4, WIDTH / 4, WIDTH / 4, 0, Math.PI / 2)
      .lineStyle(25, this.clr[1])
      .arc(WIDTH / 4, WIDTH / 4, WIDTH / 4, Math.PI / 2, Math.PI)
      .lineStyle(25, this.clr[2])
      .arc(WIDTH / 4, WIDTH / 4, WIDTH / 4, Math.PI, (Math.PI * 3) / 2)
      .lineStyle(25, this.clr[3])
      .arc(WIDTH / 4, WIDTH / 4, WIDTH / 4, (Math.PI * 3) / 2, Math.PI * 2);

    this.shape2 = new Graphics()
      .lineStyle(25, this.clr[0])
      .arc(WIDTH / 4, WIDTH / 4, WIDTH / 4, 0, Math.PI / 2)
      .lineStyle(25, this.clr[1])
      .arc(WIDTH / 4, WIDTH / 4, WIDTH / 4, Math.PI / 2, Math.PI)
      .lineStyle(25, this.clr[2])
      .arc(WIDTH / 4, WIDTH / 4, WIDTH / 4, Math.PI, (Math.PI * 3) / 2)
      .lineStyle(25, this.clr[3])
      .arc(WIDTH / 4, WIDTH / 4, WIDTH / 4, (Math.PI * 3) / 2, Math.PI * 2);

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
