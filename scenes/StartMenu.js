import { Container, Graphics, Sprite, Text, Texture } from "pixi.js";
import { Manager } from "../manager.js";
import { Stage } from "./Stage.js";
import { Selection } from "../game/Buttons.js";
export class StartMenu extends Container {
  constructor() {
    super();
    this.screenWidth = Manager.width;
    this.screenHeight = Manager.height;
    this.logo = Sprite.from("logo");
    this.title = Sprite.from("title");
    this.title.y = 20;
    const SCALE = this.screenWidth / this.title.width;
    const LOGSCALE = this.screenHeight / 3 / this.logo.height;
    // this.title.anchor.set(0.5, 0.5);
    this.title.scale.set(SCALE, SCALE);
    this.logo.scale.set(LOGSCALE, LOGSCALE);
    this.logo.x = this.screenWidth / 2 - this.logo.width / 2;
    this.logo.y = this.screenHeight - this.logo.height - 40;
    this.play = new Container();
    this.play.x = this.screenWidth / 2;
    this.play.y = this.screenHeight / 2 + 25;
    this.background = new Graphics()
      .beginFill(0xcee7e1)
      .drawRect(0, 0, this.screenWidth, this.screenHeight);
    // Create a play button
    const playButton = new Graphics()
      .beginFill(0x4eac8e)
      .drawRoundedRect(-150, -35, 300, 60, 15);
    playButton.eventMode = "static";
    playButton.buttonMode = true;

    playButton.on("pointerdown", () => {
      const operators = [];
      for (let operator in Manager.arithmetic) {
        if (Manager.arithmetic[operator]) {
          operators.push(operator);
        } else {
        }
      }

      Manager.operators = operators;
      Manager.changeScene(new Stage());
    });
    playButton.on("pointerover", () => {
      playButton.cursor = "pointer";
    });
    playButton.on("pointerout", () => {
      playButton.cursor = "default";
    });
    this.play.addChild(playButton);
    // Create a play button text
    const buttonText = new Text("Play", {
      fontSize: 32,
      fill: 0xffffff,
      align: "center",
      fontWeight: "bolder",
      fontFamily: "Helvetica",
    });
    buttonText.anchor.set(0.5, 0.4);
    buttonText.position.set(0, -10);
    this.play.addChild(buttonText);

    this.selection = new Selection();
    this.selection.x = this.screenWidth / 2 - this.selection.width / 2;
    this.selection.y = this.screenHeight * 0.37;
    this.addChild(
      this.background,
      this.play,
      this.logo,
      this.title,
      this.selection,
    );
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
  }

  update(deltaTime) {
    // Update logic goes here
  }
}
