import { Container, Graphics } from "pixi.js";
import { Manager } from "../manager";
export class Arithmetic extends Container {
  constructor() {
    super();
    this.screenWidth = Manager.width;
    this.screenHeight = Manager.height;

 this.operators =[...Manager.operators]

this.operand = [Math.trunc(Math.random()*this.operands.length)]

Math.random
    const choices = [];
    this.choiceWidth = this.sceneWidth / projects.length;
    this.idx = 0;
for (let i =0;i<5)
  }

  update() {
    possibilities.forEach(() => {});
  }

  createChoice(src) {
    const y = Math.max(30, this.screenHeight / 20);
    const width = this.choiceWidth;
    const height = this.screenHeight * 0.9;
    const x = width * this.idx++;
    const proj = new Project(x, y, width, height, src);
    this.choices.push(proj);
  }
}

class Choice extends Container {
  constructor(x, y, width, height, val) {
    super();
    this.sprite.eventMode = "static";
    this.sprite.cursor = "pointer";

    new Graphics().beginFill(0x00eeee).drawRoundedRect(x, y, width, height);

    this.minWidth = width;
    this.maxWidth = Math.min(this.sprite.width, this.minWidth * 2);
    this.x = x;
    this.y = y;
    this.sprite.mask = this.bounds;
    this.addChild(this.sprite, this.bounds);
  }
}
