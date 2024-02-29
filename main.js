import "./style.css";
import { Manager } from "./manager.js";
import { LoaderScene } from "./scenes/LoaderScene";

const canvas = document.getElementById("pixi-canvas");
// canvas.width = window.screen.width;
// canvas.height = 640;
Manager.initialize(window.innerWidth, window.innerHeight, 0x2e3037);
const loader = new LoaderScene();
Manager.changeScene(loader);
// console.log((Manager.app.renderer.screen.width = 400));
// Manager.app.renderer.screen.width = 400;
