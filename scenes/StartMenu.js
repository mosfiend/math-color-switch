import { Container, Graphics, Sprite, Text, Texture } from "pixi.js";
import { Manager } from "../manager.js";
import { Stage } from "./Stage.js";
export class StartMenu extends Container {
  constructor() {
    super();
    this.screenWidth = Manager.width;
    this.screenHeight = Manager.height;
    this.logo = Sprite.from("logo");
    this.title = Sprite.from("title");
    this.logo.x = this.screenWidth / 2;
    this.logo.y = this.screenHeight * 0.8;
    this.title.x = this.screenWidth / 2;
    this.title.y = this.screenHeight * 0.2;
    this.logo.anchor.set(0.5, 0.5);
    this.title.anchor.set(0.5, 0.5);
    this.title.scale.set(0.6, 0.6);
    this.logo.scale.set(0.6, 0.6);
    this.menuBox = new Container();
    this.menuBox.position.set(this.screenWidth / 2, this.screenHeight / 2);
    this.background = new Graphics()
      .beginFill(0xcee7e1)
      .drawRect(0, 0, this.screenWidth, this.screenHeight);
    // Create a play button
    const playButton = new Graphics()
      .beginFill(0x231f20)
      .drawRoundedRect(-150, -35, 300, 60, 15);
    playButton.interactive = true;
    playButton.buttonMode = true;
    playButton.on("pointerdown", () => {
      Manager.changeScene(new Stage());
    });
    playButton.on("pointerover", () => {
      playButton.cursor = "pointer";
    });
    playButton.on("pointerout", () => {
      playButton.cursor = "default";
    });
    this.menuBox.addChild(playButton);
    // Create a play button text
    const buttonText = new Text("Play", {
      fontSize: 32,
      fill: 0xffffff,
      align: "center",
    });
    buttonText.anchor.set(0.5, 0.5);
    buttonText.position.set(0, -10);
    this.menuBox.addChild(buttonText);

    this.selection = new Selection();
    this.selection.x = this.screenWidth / 2 - this.selection.width / 2;
    this.selection.y = this.screenHeight * 0.35;
    this.addChild(
      this.background,
      this.menuBox,
      this.logo,
      this.title,
      this.selection,
    );
    this.logo.x = this.screenWidth / 2;
    this.logo.y = this.screenHeight * 0.8;
  }

  transitionIn() {
    Manager.app.stage.addChild(Manager.currentScene);
  }

  transitionOut() {
    Manager.app.stage.removeChild(Manager.currentScene);
  }

  resize(newWidth, newHeight) {
    this.screenWidth = newWidth;
    this.screenHeight = newHeight;
    this.menuBox.position.set(this.screenWidth / 2, this.screenHeight / 2);
  }

  update(deltaTime) {
    // Update logic goes here
  }
}

class Selection extends Container {
  constructor() {
    super();
    this.plus = new Icon("plus");
    this.minus = new Icon("minus");
    this.times = new Icon("times");
    this.by = new Icon("by");

    this.minus.x = this.plus.width + 10;
    this.times.x = this.minus.width + this.minus.x + 10;
    this.by.x = this.times.width + this.times.x + 10;
    this.addChild(this.plus, this.minus, this.times, this.by);
    this.scale.set(0.3, 0.3);
  }
}
class Icon extends Sprite {
  constructor(texture) {
    super();
    this.operator = texture;
    this.selected = Manager.arithmetic[texture];
    this.texture = Texture.from(texture);
    this.eventMode = "static";
    this.cursor = "pointer";

    this.on("pointerdown", () => {
      this.select();
    });
  }
  select() {
    if (!this.selected) {
      this.alpha = 1;
      Manager.arithmetic[this.operator] = true;
    } else {
      if (this.checkFalsehood() === 1) return;
      this.alpha = 0.6;
      Manager.arithmetic[this.operator] = false;
    }

    this.selected = !this.selected;
  }
  checkFalsehood() {
    let output = 0;
    for (let operator in Manager.arithmetic) {
      if (Manager.arithmetic[operator]) output++;
    }
    return output;
  }
}
