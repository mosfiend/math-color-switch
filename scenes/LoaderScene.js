import * as PIXI from "pixi.js";
import { sound, Sound } from "@pixi/sound";
import { Manager } from "../manager";
import { manifest } from "../assets/assets";
import { StartMenu } from "./StartMenu";
import { Stage } from "./Stage";
export class LoaderScene extends PIXI.Container {
  constructor() {
    super();
    this.initializeLoader().then(() => {
      this.gameLoaded();
    });
  }
  update(deltaTime) {}
  async initializeLoader() {
    Manager.createPhysics(); // No idea where I should put this, it's not async but I need to be loaded a bit before my assets
    await PIXI.Assets.init({ manifest });
    const bundleIds = manifest.bundles.map((bundle) => bundle.name);
    await PIXI.Assets.loadBundle(bundleIds);
    const sprites = {
      jump: { start: 1.35, end: 1.5 },
      collect: { start: 2.3, end: 2.8 },
      change: { start: 3.7, end: 4 },
      death: { start: 12.3, end: 13 },
    };
    Manager.sfx = Sound.from({ url: "sounds/sounds.mp3", sprites: sprites });
    console.log(Manager.soundSettings);
    Manager.sfx.volume = Manager.soundSettings.sfx ? 0.1 : 0;
    Manager.music = Sound.from({ url: "sounds/theme.mp3", sprites: sprites });
    Manager.music.volume = Manager.soundSettings.music ? 0.1 : 0;
    Manager.music.loop = true;
    Manager.music.play();
    console.log(Manager.music);
  }
  downloadProgress(progressRatio) {}
  gameLoaded() {
    Manager.changeScene(new StartMenu());
  }
  transitionIn() {
    Manager.app.stage.addChild(Manager.currentScene);
  }

  transitionOut() {
    Manager.app.stage.removeChild(Manager.currentScene);
  }

  resize() {}
}
