import * as PIXI from "pixi.js";
import Matter from "matter-js";
import { Manager } from "../manager";
export class Hero extends PIXI.Container {
  constructor(x, y, keySet) {
    super();
    this.screenWidth = Manager.width;
    this.screenHeight = Manager.height;
    const KAHLER = Manager.colors[Math.trunc(Math.random() * 4)];
    this.keySet = keySet;
    // graphics
    this.sprite = new PIXI.Graphics().beginFill(KAHLER).drawCircle(0, 0, 15);
    // this.sprite.x = this.screenWidth / 2 + this.screenWidth / 8 - 5;
    this.sprite.x = this.screenWidth / 2 - this.sprite.width / 2;
    this.sprite.y = this.screenHeight * 0.8;
    this.addChild(this.sprite);
    // physics
    this.body = Matter.Bodies.circle(
      this.sprite.x + this.sprite.width / 2,
      this.sprite.y + this.sprite.height / 2,
      this.sprite.width / 2,
      { friction: 0 },
    );
    Matter.World.add(Manager.physics.world, this.body);
    this.body.clr = KAHLER;
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
    this.sprite.x = this.body.position.x;
    this.sprite.y = this.body.position.y;
    Matter.Body.setAngle(this.body, 0);
    if (this.keySet.has("a") || this.keySet.has("ArrowLeft")) this.startJump();

    this.sprite.x = this.body.position.x;
    this.sprite.y = this.body.position.y;
  }

  interact(e) {
    const colliders = [e.pairs[0].bodyA, e.pairs[0].bodyB];
    console.log(colliders.map((a) => a.clr));
    const hero = colliders.find((body) => body.gameHero);
    const platform = colliders.find((body) => body.ground);
  }
  startJump() {
    Matter.Body.setVelocity(this.body, { x: this.dx, y: -10 });
    const v = Matter.Body.getVelocity(this.body);
    this.dy = v.y;
  }
  stayOnPlatform(platform) {
    this.platform = platform;
    this.jumpIndex = 0;
    Matter.Body.setVelocity(this.body, { x: 5 });
    const v = Matter.Body.getVelocity(this.body);
    this.dx = v.x;
  }
  handleEvent(key, keySet) {
    this.keySet = keySet;
    if (key === "w" || key === " ") this.startJump(1);
  }
  changeColor(clr) {
    const x = this.sprite.x;
    const y = this.sprite.y;
    this.body.clr = clr;
    this.sprite.clear().beginFill(clr).drawCircle(0, 0, 15);
    this.sprite.x = this.body.position.x;
    this.sprite.y = this.body.position.y;
  }
}
