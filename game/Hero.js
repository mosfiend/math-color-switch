import { Graphics, Container } from "pixi.js";
import Matter from "matter-js";
import { Manager } from "../manager";
import { Tween } from "tweedle.js";
export class Hero extends Container {
  constructor(x, y, keySet) {
    super();
    this.screenWidth = Manager.width;
    this.screenHeight = Manager.height;
    const KAHLER = Manager.colors[Math.trunc(Math.random() * 4)];
    this.diam = 15;
    this.keySet = keySet;
    // graphics
    this.sprite = new Graphics().beginFill(KAHLER).drawCircle(0, 0, this.diam);
    // this.sprite.x = this.screenWidth / 2 + this.screenWidth / 8 - 5;
    this.sprite.x = this.screenWidth / 2 - this.sprite.width / 2;
    this.sprite.y = this.screenHeight * 0.8;
    this.transSprite = new Graphics();
    this.imploded = false;
    this.addChild(this.transSprite, this.sprite);
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

    this.fragments = [];
  }

  update(deltaTime) {
    this.fragments.forEach((frag) => {
      frag.x = frag.body.position.x;
      frag.y = frag.body.position.y;
    });
    if (this.imploded) return;
    const v = Matter.Body.getVelocity(this.body);
    this.dy = v.y;
    Matter.Body.setAngle(this.body, 0);
    this.sprite.x = this.body.position.x;
    this.sprite.y = this.body.position.y;
    this.transSprite.x = this.body.position.x;
    this.transSprite.y = this.body.position.y;
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
    if (key === " ") this.startJump(1);
  }
  changeColor(clr) {
    const x = this.sprite.x;
    const y = this.sprite.y;
    this.transSprite.clear().beginFill(this.body.clr).drawCircle(0, 0, 15);
    // this.transSprite.alpha = 1;
    this.transSprite.x = this.body.position.x;
    this.transSprite.y = this.body.position.y;
    console.log(this.body.clr);
    this.body.clr = clr;
    this.sprite.clear().beginFill(clr).drawCircle(0, 0, 15);
    this.sprite.alpha = 0;
    this.sprite.x = this.body.position.x;
    this.sprite.y = this.body.position.y;
    console.log(this.body.clr);
    const tween = new Tween(this.sprite)
      .to({ alpha: 1 }, 500)
      .onUpdate(() => {})
      .onComplete(() => {
        // this.transSprite.alpha = 0;
      })
      .start();
  }
  implode() {
        if (this.imploded) return
    this.sprite.clear();
    this.transSprite.clear();
    this.sprite.alpha = 0;
    for (let i = 0; i < Math.random() * 10 + 10; i++) {
      const frag = this.makeFragment();
      this.fragments.push(frag);
      this.addChild(frag);
    }
    this.imploded = true;
  }
  makeFragment() {
    const clr = [...Manager.colors];
    clr.push(0xcccccc);
    const dim = (1 / Math.sqrt(2)) * this.diam;
    const fragment = new Graphics()
      .beginFill(clr[Math.trunc(Math.random() * 5)])
      .drawCircle(
        this.x + this.sprite.x - dim + 2 * Math.random() * dim,
        this.y + this.sprite.y - dim + 2 * Math.random() * dim,
        Math.random() * 6 + 4,
      );

    fragment.body = Matter.Bodies.circle(
      fragment.x + fragment.width / 2,
      fragment.y + fragment.height / 2,
      fragment.width / 2,
      { friction: 0 },
    );
    Matter.World.add(Manager.physics.world, fragment.body);
    return fragment;
  }
}
