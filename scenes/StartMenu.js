import { Container, Graphics, Sprite, Text } from "pixi.js";
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
    this.logo.y = this.screenHeight * 0.2;
    this.title.x = this.screenWidth / 2;
    this.title.y = this.screenHeight * 0.8;
    this.logo.anchor.set(0.5, 0.5);
    this.title.anchor.set(0.5, 0.5);

    this.menuBox = new Container();
    this.menuBox.position.set(this.screenWidth / 2, this.screenHeight / 2);
    this.background = new Graphics()
      .beginFill(0xcee7e1)
      .drawRect(0, 0, this.screenWidth, this.screenHeight);
    // Create a play button
    const playButton = new Graphics()
      .beginFill(0x00ff00)
      .drawRoundedRect(-100, -30, 200, 60, 15);
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

    // Create additional elements
    const infoText = new Text("Welcome to the Game", {
      fontSize: 24,
      fill: 0xffffff,
      align: "center",
    });
    infoText.anchor.set(0.5, 0.5);
    infoText.position.set(0, -80);
    this.menuBox.addChild(infoText);

    this.optionsButton = new Graphics()
      .beginFill(0x0000ff)
      .drawRoundedRect(-80, 20, 160, 40, 10);
    this.optionsButton.interactive = true;
    this.optionsButton.buttonMode = true;
    this.optionsButton.on("pointerdown", () => {
      // Handle options button click
    });
    this.optionsButton.on("pointerover", () => {
      this.optionsButton.cursor = "pointer";
    });
    this.optionsButton.on("pointerout", () => {
      this.optionsButton.cursor = "default";
    });
    this.menuBox.addChild(this.optionsButton);

    const optionsText = new Text("Options", {
      fontSize: 20,
      fill: 0xffffff,
      align: "center",
    });
    optionsText.anchor.set(0.5, 0.5);
    optionsText.position.set(0, 40);
    this.menuBox.addChild(optionsText);

    this.addChild(this.background, this.menuBox, this.logo, this.title);
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
