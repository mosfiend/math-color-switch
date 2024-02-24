import * as PIXI from "pixi.js";
import Matter from "matter-js";
import { Manager } from "../manager.js";
import { Background } from "../game/Background.js";
import { Hero } from "../game/Hero.js";
import { DoubleCircle, Square } from "../game/Platforms.js";
import * as Filters from "pixi-filters";
import { sound } from "@pixi/sound";
export class Stage extends PIXI.Container {
  constructor() {
    super();
    this.screenWidth = Manager.width;
    this.screenHeight = Manager.height;
    this.filter = new Filters.AsciiFilter();
    this.keySet = new Set();
    this.writerMode = false;
    this.theme = sound._sounds.around;
    this.theme.volume = 0.05;
    // this.theme.play();
    // this.song = sound.add("spice", "/assets/images/ITS.mp3")
    /// ELEMENTS
    this.platforms = new DoubleCircle(this.screenWidth / 2, 0);
    this.square = new Square(this.screenWidth / 2, 0);
    this.bg = new Background(this.screenHeight);
    this.groundHeight = this.bg.groundHeight;
    this.hero = new Hero(this.screenWidth / 2, 150, this.keySet);
    this.text = new PIXI.Text(this.hero.sprite.y, { fill: 0xffffff });
    this.text.y = this.hero.sprite.y;
    this.addChild(this.bg, this.platforms, this.square, this.hero, this.text);
    this.interactive = true;
    // make entire screen interactive
    const bg = new PIXI.Graphics()
      .beginFill(0xff00ff)
      .drawRect(0, 0, this.screenWidth, this.screenHeight);
    bg.alpha = 0;
    this.addChild(bg);
    this.on("pointerdown", () => {
      this.hero.startJump();
    });

    this.watch(Manager.app.view);
    // Event handling

    Matter.Events.on(Manager.physics, "collisionStart", (e) => {
      this.hero.land(e);
    });
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
    this.handleEvent();
    this.text.text = Math.trunc(this.hero.sprite.y);
    this.bg.update(deltaTime);
    this.hero.update(deltaTime);
    const world = Manager.app.stage;
    const DIFF = this.hero.sprite.y - (this.screenHeight / 2 + world.pivot.y);
    if (DIFF < 0) {
      // world.position.y= this.hero.y + 5
      world.pivot.set(0, world.pivot.y + DIFF);
      console.log(world.y, world.pivot.y, this.hero.sprite.y);
    }
    this.platforms.update(deltaTime);
    this.square.update(deltaTime);
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
}
