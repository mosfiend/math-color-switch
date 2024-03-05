import { Container } from "pixi.js";
import { Manager } from "../manager";
import { Circle, DoubleCircle, Square, Triangle } from "./Platforms";
import { ColorChanger, Star } from "./Items";
import { Arithmetic } from "./Arithmetic";

export class GameLoop extends Container {
  constructor() {
    super();
    this.step = 1;
    this.screenWidth = Manager.width;
    this.screenHeight = Manager.height;
    this.blocks = [];
    this.stars = [];
    this.changers = [];
    this.obstacles = [
      Arithmetic,
      // Triangle,
      // Square,
      // Circle,
      // DoubleCircle,
    ];

    const star = new Star(Manager.app.stage.pivot.y);
    const block = new this.obstacles[
      Math.trunc(Math.random() * this.obstacles.length)
    ](Manager.app.stage.pivot.y);
    this.blocks.push(block);
    this.addChild(block);
    this.addChild(star);
  }

  update(deltaTime) {
    this.blocks.forEach((block) => {
      block.update(deltaTime);
    });
    const curBlock = this.blocks[0];
    if (this.blocks[this.blocks.length - 1].y > Manager.app.stage.pivot.y) {
      if (this.step === 0) {
        this.changeColor();
      } else if (this.step === 4) {
        this.createArithmeticBlock();
      } else if (true) {
        this.createBlock();
      }
    }
    if (
      curBlock.y >
      Math.abs(Manager.app.stage.pivot.y) + this.screenHeight * 1.5
    ) {
      this.removeChild(this.blocks[0]);
      this.blocks[0].destroy();
      this.blocks.shift();
    }
  }
  createBlock() {
    const block = new this.obstacles[
      Math.trunc(Math.random() * this.obstacles.length)
    ](this.blocks[this.blocks.length - 1].y - this.screenHeight);
    const star = new Star(
      this.blocks[this.blocks.length - 1].y - this.screenHeight,
    );
    this.stars.push(star);
    this.blocks.push(block);
    this.step = (this.step + 1) % 5;
    this.addChild(block);
    this.addChild(star);
  }
  createArithmeticBlock() {
    const block = new Arithmetic(
      this.blocks[this.blocks.length - 1].y - 240 - this.screenHeight,
    );
    this.step = (this.step + 1) % 5;
    this.blocks.push(block);
    this.addChild(block);
  }
  changeColor() {
    this.step = (this.step + 1) % 5;
    const ball = new ColorChanger(
      this.blocks[this.blocks.length - 1].y - this.screenHeight,
    );

    this.changers.push(ball);
    this.blocks.push(ball);
    this.addChild(ball);
  }
}
