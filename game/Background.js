import { Container, Graphics } from "pixi.js";
import Matter from "matter-js";
import { Manager } from "../manager";

export class Background extends Container {
  constructor() {
    super();
  }

  update(deltaTime) {
    // Matter.Body.rotate(this.roofTile.body, 0.01);
    // // Matter.Body.setAngle(this.roofTile.body, Math.PI / 4);
    // const anga = (this.roofTile.body.angle / Math.PI) * 180;
    // this.roofTile.sprite.angle = anga;
    // this.roofTile.sprite.x = this.roofTile.body.position.x;
    // this.roofTile.sprite.y = this.roofTile.body.position.y;
  }
}

class RoofTile {
  constructor(x, y) {
    this.sprite = new Graphics().beginFill(0xff0000).drawRect(0, 0, 400, 30);
    // this.sprite.scale.set(3);
    this.sprite.pivot.set(this.sprite.width / 2, this.sprite.height / 2);
    this.sprite.x = Manager.width / 2;
    this.sprite.y = y;
    console.log(this.sprite.width, this.sprite.height);
    this.body = Matter.Bodies.rectangle(
      this.sprite.x,
      this.sprite.y,
      this.sprite.width,
      this.sprite.height,
      { friction: 0, isStatic: true },
    );

    Matter.World.add(Manager.physics.world, this.body);

    this.body.ground = true;
  }
}
