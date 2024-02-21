import * as PIXI from "pixi.js";
import Matter from "matter-js";
import { Manager } from "../manager";
import * as Filters from "pixi-filters";

export class Hero extends PIXI.Container {
  constructor(x, y, keySet) {
    super();
    this.screenWidth = Manager.width;
    this.screenHeight = Manager.height;
    this.keySet = keySet;
    // graphics
    this.sprite = new PIXI.Graphics().beginFill(0xcccccc).drawCircle(0, 0, 17);
    this.sprite.x = this.screenWidth/2;
    this.sprite.y = this.screenHeight*0.8;

    this.addChild(this.sprite);
    // physics
    this.body = Matter.Bodies.rectangle(
      this.sprite.x + this.sprite.width / 2,
      this.sprite.y + this.sprite.height / 2,
      this.sprite.width,
      this.sprite.height,
      { friction: 0 },
    );
    Matter.World.add(Manager.physics.world, this.body);
    this.body.gameHero = true; // why am i using this
    this.dy = 15;
    this.dx = 0;
    this.maxJumps = 2;
    this.jumpIndex = 0;
    this.maxSpeed = 5;
  }

  update(deltaTime) {
    const v = Matter.Body.getVelocity(this.body);
    this.dy = v.y;
    this.sprite.x = this.body.position.x - this.sprite.width / 2;
    this.sprite.y = this.body.position.y - this.sprite.height / 2;

    if (this.keySet.has("a") || this.keySet.has("ArrowLeft")) this.startJump();
  }

  startJump() {
    console.log("go");
    Matter.Body.setVelocity(this.body, { x: this.dx, y: -10 });
    const v = Matter.Body.getVelocity(this.body);
    console.log(v);
    this.dy = v.y;
  }

  stayOnPlatform(platform) {
    this.platform = platform;
    this.jumpIndex = 0;
  }

  handleEvent(key, keySet) {
    this.keySet = keySet;
    if (key === "w" || key === " ") this.startJump(1);
  }
}
