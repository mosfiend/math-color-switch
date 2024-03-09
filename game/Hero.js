import { Graphics, Container } from "pixi.js";
import Matter from "matter-js";
import { Manager } from "../manager";
import { Tween } from "tweedle.js";
export class Hero extends Container {
  constructor(x, y) {
    super();
    this.screenWidth = Manager.width;
    this.screenHeight = Manager.height;
    this.started = false;
    this.imploded = false;
    this.released = true;
    this.clr = Manager.colors[Math.trunc(Math.random() * 4)];
    this.diam = 12;
    // graphics
    this.sprite = new Graphics()
      .beginFill(this.clr)
      .drawCircle(0, 0, this.diam);
    // this.sprite.x = this.screenWidth / 2 + this.screenWidth / 8 - 5;
    this.sprite.x = this.screenWidth / 2;
    this.sprite.y = this.screenHeight * 1 - 150;
    this.transSprite = new Graphics();
    this.addChild(this.transSprite, this.sprite);
    // physics
    this.dy = 15;
    this.dx = 0;
    this.maxJumps = 2;
    this.jumpIndex = 0;
    this.maxSpeed = 5;

    this.fragments = [];
  }

  update(deltaTime) {
    if (!this.started) {
      return;
    }
    this.fragments.forEach((frag) => {
      frag.x = frag.body.position.x;
      frag.y = frag.body.position.y;
    });
    if (this.imploded) return;
    const v = Matter.Body.getVelocity(this.body);
    this.dy = v.y;
    Matter.Body.setAngle(this.body, 0);
    this.sprite.x = this.body.position.x - this.sprite.width / 2;
    this.sprite.y = this.body.position.y;
    this.transSprite.x = this.body.position.x - this.sprite.width / 2;
    this.transSprite.y = this.body.position.y;
  }

  interact(e) {
    const colliders = [e.pairs[0].bodyA, e.pairs[0].bodyB];
    const hero = colliders.find((body) => body.gameHero);
    const platform = colliders.find((body) => body.ground);
  }

  startJump() {
    const temp = this.started;
    this.started = true;
    if (!temp) {
      this.body = Matter.Bodies.circle(
        this.sprite.x + this.sprite.width / 2,
        this.sprite.y - this.sprite.height / 2,
        this.sprite.width / 2,
        { friction: 0, isSensor: true },
      );
      this.body.clr = this.clr;
      this.body.gameHero = true; // why am i using this
      Matter.World.add(Manager.physics.world, this.body);
    }
    Matter.Body.setVelocity(this.body, { x: this.dx, y: -7 });
    const v = Matter.Body.getVelocity(this.body);
    this.dy = v.y;
  }

  handleEvent(key) {
    if (key === " " && this.released) {
      this.startJump();
      this.released = false;
    }
  }

  changeColor(clr) {
    const x = this.sprite.x;
    const y = this.sprite.y;
    this.transSprite
      .clear()
      .beginFill(this.body.clr)
      .drawCircle(0, 0, this.diam);
    // this.transSprite.alpha = 1;
    this.transSprite.x = this.body.position.x - this.sprite.width / 2;
    this.transSprite.y = this.body.position.y
    this.body.clr = clr;
    this.sprite.clear().beginFill(clr).drawCircle(0, 0, this.diam);
    this.sprite.alpha = 0;
    this.sprite.x = this.body.position.x - this.sprite.width / 2;
    this.sprite.y = this.body.position.y;

    const tween = new Tween(this.sprite)
      .to({ alpha: 1 }, 500)
      .onUpdate(() => {})
      .onComplete(() => {
        // this.transSprite.alpha = 0;
      })
      .start();
  }

  implode() {
    if (this.imploded) return;
    this.sprite.clear();
    this.transSprite.clear();
    this.sprite.alpha = 0;
    for (let i = 0; i < Math.random() * 10 + 10; i++) {
      const frag = this.makeFragment();
      this.fragments.push(frag);
      this.addChild(frag);

      Matter.Body.setVelocity(frag.body, {
        x: 5 - Math.random() * 10,
        y: 10 - Math.random() * 20,
      });
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
        Math.random() * 4 + 4,
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
