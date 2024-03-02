import { Container, Graphics, Text } from "pixi.js";
import Matter from "matter-js";
import { Manager } from "../manager.js";
import { Background } from "../game/Background.js";
import { Hero } from "../game/Hero.js";
import { GameLoop } from "../game/GameLoop.js";
import { Square } from "../game/Platforms.js";
import * as Filters from "pixi-filters";
import { sound } from "@pixi/sound";
export class Stage extends Container {
  constructor() {
    super();
    this.screenWidth = Manager.width;
    this.screenHeight = Manager.height;
    this.filter = new Filters.AsciiFilter();
    this.keySet = new Set();
    this.writerMode = false;
    // this.theme = sound._sounds.around;
    // this.theme.volume = 0.05;
    // this.lost = false;
    // this.theme.play();
    // this.song = sound.add("spice", "/assets/images/ITS.mp3")
    /// ELEMENTS

    this.hero = new Hero(this.screenWidth / 2, 150, this.keySet);
    this.text = new Text(this.hero.sprite.y, { fill: 0xffffff });
    this.text.y = this.hero.sprite.y;
    this.bg = new Background(this.screenHeight);
    this.gameLoop = new GameLoop();
    this.addChild(this.bg, this.gameLoop, this.hero, this.text);
    this.interactive = true;
    // make entire screen interactive
    this.on("pointerdown", () => {
      this.hero.startJump();
    });

    Matter.Events.on(Manager.physics, "collisionStart", (e) => {
      // Manager.gameOver();
      this.interact(e);
    });
    this.watch(Manager.app.view);
    // Event handling
  }
  transitionIn() {
    Manager.app.stage.addChild(Manager.currentScene);
  }

  transitionOut() {
    Manager.app.stage.removeChild(Manager.currentScene);
    // Manager.app.stage.off("mousemove") remember to turn off events
  }
  resize(newWidth, newHeight) {
    this.screenWidth = newWidth;
    this.screenHeight = newHeight;
  }
  update(deltaTime) {
    if (this.lost) return;
    this.handleEvent();
    this.text.text = Math.trunc(this.hero.sprite.y);
    this.bg.update(deltaTime);
    this.hero.update(deltaTime);
    const world = Manager.app.stage;
    const DIFF = this.hero.sprite.y - (this.screenHeight / 2 + world.pivot.y);
    if (DIFF < 0) {
      // world.position.y= this.hero.y + 5
      world.pivot.set(0, world.pivot.y + DIFF);
      this.bg.y=world.pivot.y
    }
    this.gameLoop.update(deltaTime);

    //COLOR SWITCH
    this.gameLoop.changers.forEach((changer) => {
      if (
        this.hero.sprite.y > changer.y &&
        this.hero.sprite.y < changer.y + changer.diam
      ) {
        this.hero.changeColor(changer.mainClr);
      }
    });

    //Circle Impact Detection
    this.gameLoop.blocks.forEach((obstacle) => {
      if (!obstacle.body) return; // color changers
      const Y = this.hero.y + this.hero.sprite.y;
      const Y1 = obstacle.y + obstacle.shape1.y + obstacle.W / 2;
      const Y2 = obstacle.y + (obstacle.shape1.y - obstacle.W) / 2;
      switch (obstacle.body.type) {
        case "circle":
          if (
            ((Y > Y1 && Y < Y1 + obstacle.diam) ||
              (Y + this.hero.height > Y1 &&
                Y + this.hero.height < Y1 + obstacle.diam)) &&
            this.hero.body.clr !== obstacle.body.clr2
          ) {
            this.lost = true;
          }
          if (
            ((Y > Y2 && Y < Y2 + obstacle.diam) ||
              (Y + this.hero.height > Y2 &&
                Y + this.hero.height < Y2 + obstacle.diam)) &&
            this.hero.body.clr !== obstacle.body.clr1
          ) {
            this.lost = true;
          }
          break;
        case "doubleCircle":
          break;
        default:
          console.log("nuh");
          return;
      }
    });
  }

  watch(el) {
    el.addEventListener("keydown", (e) => {
      this.keySet.add(e.key);
      this.handleEvent(e.key);
    });
    el.addEventListener("keyup", (e) => {
      this.keySet.delete(e.key);
    });
  }

  handleEvent(key) {
    this.hero.handleEvent(key, this.keySet);
  }

  interact(e) {
    const colliders = [e.pairs[0].bodyA, e.pairs[0].bodyB];
    if (colliders[0].clr !== colliders[1].clr) {
      this.lost = true;
    }
    const hero = colliders.find((body) => body.gameHero);
    const platform = colliders.find((body) => body.ground);
  }
}
