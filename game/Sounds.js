import { Container, Sprite } from "pixi.js";
import { Manager } from "../manager.js";

export class Sounds extends Container {
  constructor() {
    super();
    this.x = 15;
    this.y = 10;

    this.music = new Icon("music");
    this.music.x = 0;

    this.sfx = new Icon("sfx");
    this.sfx.x = Manager.width - this.sfx.width - 25;

    this.addChild(this.music, this.sfx);
  }
  update(deltaTime) {
    this.y = Manager.app.stage.pivot.y + 10;
  }
}

class Icon extends Container {
  constructor(texture) {
    super();
    this.soundType = texture;
    this.selected = Manager.soundSettings[this.soundType];

    this.sprite = Sprite.from(texture);
    const SCALE = 35 / this.sprite.height;
    this.sprite.scale.x = SCALE;
    this.sprite.scale.y = SCALE;
    this.alpha = this.selected ? 1 : 0.6;
    Manager[this.soundType].volume = this.selected ? 0.1 : 0;
    this.addChild(this.sprite);
    this.eventMode = "static";
    this.cursor = "pointer";

    this.on("pointerdown", this.toggle);
  }
  toggle(e) {
    e.stopPropagation();
    console.log("okay");
    if (!this.selected) {
      this.alpha = 1;
      Manager[this.soundType].volume = 0.1;
      Manager.soundSettings[this.soundType] = true;
    } else {
      this.alpha = 0.6;
      Manager[this.soundType].volume = 0;
      Manager.soundSettings[this.soundType] = false;
    }
    localStorage.setItem(
      "soundSettings",
      JSON.stringify(Manager.soundSettings),
    );
    this.selected = !this.selected;
  }
}
