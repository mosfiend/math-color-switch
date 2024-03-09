import { Container, Graphics, Sprite, Text } from "pixi.js";
import Matter from "matter-js";
import { sound } from "@pixi/sound";
import { Tween } from "tweedle.js";
import { Manager } from "../manager.js";
import { Background } from "../game/Background.js";
import { Hero } from "../game/Hero.js";
import { GameLoop } from "../game/GameLoop.js";
import { Square } from "../game/Platforms.js";
import { GameOver } from "../game/GameOver.js";
import { StartMenu } from "./StartMenu.js";

export class Stage extends Container {
  constructor() {
    super();
    this.screenWidth = Manager.width;
    this.screenHeight = Manager.height;
    this.keySet = new Set();
    this.released = true;
    this.score = 0;
    this.pause = Sprite.from("pause");
    this.pause.x = this.screenWidth - 100;
    this.pause.width = 100;
    this.pause.height = 100;

    this.pause.eventMode = "static";
    this.pause.cursor = "pointer";
    this.pause.on("pointerdown", () => {});
    // this.theme = sound._sounds.around;
    // this.theme.volume = 0.05;
    // this.lost = false;
    // this.theme.play();
    // this.song = sound.add("spice", "/assets/images/ITS.mp3")
    /// ELEMENTS

    this.hero = new Hero(this.screenWidth / 2, 150, this.keySet);
    this.scoreBoard = new Text(this.hero.sprite.y, { fill: 0xffffff });

    this.scoreBoard.x = 15;
    this.scoreBoard.y = Manager.app.stage.pivot.y + 15;
    this.bg = new Background(this.screenHeight);
    this.gameLoop = new GameLoop();
    this.addChild(this.bg, this.gameLoop, this.hero, this.scoreBoard);
    this.eventMode = "static";
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
    this.hero.update(deltaTime);
    if (this.lost) return;
    this.handleEvent();
    this.scoreBoard.text = Math.trunc(this.score);
    this.scoreBoard.y = Manager.app.stage.pivot.y + 15;
    this.pause.y = Manager.app.stage.pivot.y + 20;
    this.bg.update(deltaTime);
    const world = Manager.app.stage;
    const DIFF = this.hero.sprite.y - (this.screenHeight / 2 + world.pivot.y);
    if (DIFF < 0) {
      // world.position.y= this.hero.y + 5
      world.pivot.set(0, world.pivot.y + DIFF);
      this.bg.y = world.pivot.y;
    }
    this.gameLoop.update(deltaTime);

    //COLOR SWITCH

    this.gameLoop.stars.forEach((star) => {
      if (
        this.hero.sprite.y > star.y &&
        this.hero.sprite.y < star.y + star.height
      ) {
        if (!star.imploded) this.score++;
        star.activate();
      }
      star.update();
    });

    this.gameLoop.changers.forEach((changer) => {
      if (
        this.hero.sprite.y > changer.y &&
        this.hero.sprite.y < changer.y + changer.diam
      ) {
        this.hero.changeColor(changer.mainClr);
      }
    });

    //Circle Impact Detection
    if (
      this.hero.y + this.hero.sprite.y + this.hero.height * 2 >
      Manager.app.stage.pivot.y + this.screenHeight
    ) {
      this.lose();
    }
    this.gameLoop.blocks.forEach((obstacle) => {
      if (!obstacle.body) return; // color changers
      switch (obstacle.body.type) {
        case "circle":
          const Y = this.hero.y + this.hero.sprite.y;
          const Y1 = obstacle.y + obstacle.shape1.y + obstacle.W / 2;
          const Y2 = obstacle.y + (obstacle.shape1.y - obstacle.W) / 2;
          if (
            ((Y > Y1 && Y < Y1 + obstacle.diam) ||
              (Y + this.hero.height > Y1 &&
                Y + this.hero.height < Y1 + obstacle.diam)) &&
            this.hero.body.clr !== obstacle.body.clr2
          ) {
            this.lose();
          }
          if (
            ((Y > Y2 && Y < Y2 + obstacle.diam) ||
              (Y + this.hero.height > Y2 &&
                Y + this.hero.height < Y2 + obstacle.diam)) &&
            this.hero.body.clr !== obstacle.body.clr1
          ) {
            this.lose();
          }
          break;

        case "doubleCircle":
          const y = this.hero.y + this.hero.sprite.y;
          const y1 = obstacle.y + obstacle.shape1.y + obstacle.W / 2;
          const y2 = obstacle.y + obstacle.shape1.y - obstacle.W / 2;
          if (
            ((y > y1 && y < y1 + obstacle.diam) ||
              (y + this.hero.height > y1 &&
                y + this.hero.height < y1 + obstacle.diam)) &&
            this.hero.body.clr !== obstacle.body.clr2
          ) {
            this.lose();
          }
          if (
            ((y > y2 && y < y2 + obstacle.diam) ||
              (y + this.hero.height > y2 &&
                y + this.hero.height < y2 + obstacle.diam)) &&
            this.hero.body.clr !== obstacle.body.clr1
          ) {
            this.lose();
          }
          const ye1 = obstacle.y + obstacle.shape2.y + obstacle.W / 2;
          const ye2 = obstacle.y + obstacle.shape2.y - obstacle.W / 2;
          if (
            ((y > ye1 && y < ye1 + obstacle.diam) ||
              (y + this.hero.height > ye1 &&
                y + this.hero.height < ye1 + obstacle.diam)) &&
            this.hero.body.clr !== obstacle.body.clr1
          ) {
            this.lose();
          }
          if (
            ((y > ye2 && y < ye2 + obstacle.diam) ||
              (y + this.hero.height > ye2 &&
                y + this.hero.height < ye2 + obstacle.diam)) &&
            this.hero.body.clr !== obstacle.body.clr2
          ) {
            this.lose();
            console.log("BOOM");
          }
          break;
        case "arithmetic":
          // ICON
          if (
            this.hero.sprite.y > obstacle.sign.y &&
            this.hero.sprite.y < obstacle.sign.y + obstacle.sign.shape.height &&
            !obstacle.touched
          ) {
            obstacle.touched = true;
            this.hero.changeColor(0xcccccc);
          }
          // CHOICES
          if (
            ((this.hero.sprite.y - this.hero.sprite.height / 2 > obstacle.y &&
              this.hero.sprite.y - this.hero.sprite.height / 2 <
                obstacle.y + obstacle.choiceHeight) ||
              (this.hero.sprite.y + this.hero.height / 2 > obstacle.y &&
                this.hero.sprite.y + this.hero.height / 2 <
                  obstacle.y + obstacle.choiceHeight)) &&
            obstacle.result !== obstacle.current
          ) {
            this.lose();
          }
          break;
        default:
          break;
      }
    });

    /////
    ////// Arithmetic collision detection
  }

  watch(el) {
    el.addEventListener("keydown", (e) => {
      this.keySet.add(e.key);
      if (e.key === " ") this.released = false;
      this.handleEvent(e.key);
    });
    el.addEventListener("keyup", (e) => {
      if (e.key === " ") this.released = true;
      this.keySet.delete(e.key);
    });
  }

  handleEvent(key) {
    this.hero.handleEvent(key, this.released);
  }

  interact(e) {
    const colliders = [e.pairs[0].bodyA, e.pairs[0].bodyB];
    const hero = colliders.find((body) => body.gameHero);
    const platform = colliders.find((body) => body.platform);
    if (hero && platform && colliders[0].clr !== colliders[1].clr) {
      this.lose();
    }
  }

  lose() {
    this.hero.implode();
    this.lost = true;
    const temp = new Graphics()
      .beginFill(0x2e3037)
      .drawRect(0, 0, this.screenWidth, this.screenHeight);
    temp.y = Manager.app.stage.pivot.y;
    temp.alpha = 0;
    this.addChild(temp);
    const tween1 = new Tween(temp).to({ alpha: 0.2 }, 300);
    const tween2 = new Tween(temp).to({ alpha: 1 }, 500);

    tween1.start().onComplete(() => {
      tween2.start().onComplete(() => {
        const scene = new GameOver(func);
        Manager.app.stage.pivot.set(0, 0);
        this.addChild(scene);
      });
    });
    function func() {
      Manager.changeScene(new Stage());
      Manager.clearPhysics();
      Manager.createPhysics();
    }
  }
}
