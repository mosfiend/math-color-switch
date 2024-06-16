import { World } from "matter-js";
import { Container } from "pixi.js";
import { Manager } from "../manager";
import { Circle, DoubleCircle, Plus, Square, Triangle } from "./Platforms";
import { SmallCircles } from "./Platforms2";
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
      // Arithmetic,
      // Triangle,
      Circle,
      Square,
      DoubleCircle,
      Plus,
      SmallCircles,
    ];

    const star = new Star(Manager.app.stage.pivot.y);
    const block = new Circle(Manager.app.stage.pivot.y + 230);
    // this.obstacles[
    // Math.trunc(Math.random() * this.obstacles.length)
    // ](Manager.app.stage.pivot.y);
    this.blocks.push(block);
    this.stars.push(star);
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
    if (curBlock.y - Manager.app.stage.pivot.y > this.screenHeight * 1.5) {
      //1.5 marge de securite
      this.removeChild(this.blocks[0]);
      this.blocks[0].destroy();
      if (curBlock.isColorChanger) {
        this.changers.shift();
      } else {
        if (curBlock.body.type === "composite") {
          World.remove(Manager.physics.world, curBlock.body);
        }
      }
      this.blocks.shift();
    }
  }
  createBlock() {
    const lastBlock = this.blocks[this.blocks.length - 1];
    console.log(lastBlock.y, lastBlock.isArithmetic);
    const block = new this.obstacles[
      Math.trunc(Math.random() * this.obstacles.length)
    ](lastBlock.y - (lastBlock.isArithmetic ? 450 : 200));
    const star = new Star(block.y);

    this.stars.push(star);
    this.blocks.push(block);
    this.step = (this.step + 1) % 5;
    this.addChild(block);
    this.addChild(star);
  }
  createArithmeticBlock() {
    const block = new Arithmetic(
      this.blocks[this.blocks.length - 1].y - this.screenHeight * 0.75,
    );
    const stars = [
      new Star(
        this.blocks[this.blocks.length - 1].y - this.screenHeight * 0.82,
      ),

      new Star(
        this.blocks[this.blocks.length - 1].y - this.screenHeight * 0.97,
      ),
      new Star(
        this.blocks[this.blocks.length - 1].y - this.screenHeight * 1.12,
      ),
    ];

    this.stars.push(...stars);
    this.step = (this.step + 1) % 5;
    this.blocks.push(block);
    this.addChild(block);
    this.addChild(...stars);
  }

  changeColor() {
    this.step = (this.step + 1) % 5;
    const ball = new ColorChanger(
      this.blocks[this.blocks.length - 1].y - this.screenHeight * 0.7,
    );

    this.changers.push(ball);
    this.blocks.push(ball);
    this.addChild(ball);
  }
}
