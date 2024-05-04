import axios from "axios";
import { Axios } from "axios";
import { Tween } from "tweedle.js";
import { Container, Graphics, Sprite, Text } from "pixi.js";
import { Menu } from "./Menu";
import { Selection } from "./Buttons";
import { Manager } from "../manager";
import { Input } from "@pixi/ui";
export class GameOver extends Container {
  constructor(cb, score) {
    super();

    this.score = score;
    this.screenWidth = Manager.width;
    this.screenHeight = Manager.height;
    this.yourScore = new Text(
      `${Manager.lang === "english" ? "Your Score" : "Jouw Score"}: ${score}`,
      {
        fontSize: 24,
        // fill: 0xffffff,
        align: "center",
        // fontWeight: "bolder",
        fontFamily: "Madimi One",
        letterSpacing: 1,
      },
    );
    this.yourScore.anchor.set(0.5, 0);
    this.yourScore.x = this.screenWidth / 2;
    this.yourScore.y = 25;

    this.name = new Input({
      bg: new Graphics()
        .beginFill(0xffffff)
        .drawRect(0, 0, 180, 35)
        .lineStyle(3, 0xcfc5b3)
        .drawRect(2, 2, 176, 31),
      textStyle: {
        // fill: 0x2c5645,
        fontSize: 20,
        align: "center",
        fontWeight: "100",
        fontFamily: "Madimi One",
        letterSpacing: 1,
      },
      // placeholder: "name",
      value: "",
      padding: {
        left: 10,
      },
    });

    this.submit = new Submit(this.organize.bind(this), this.name, this.score);

    this.name.x = (this.screenWidth - this.name.width - this.submit.width) / 2;
    this.name.y = 60;
    this.submit.x = this.name.x + this.name.width + 10;
    this.submit.y = 60;

    this.submit.x =
      (this.screenWidth - this.name.width - this.submit.width) / 2 +
      10 +
      this.name.width;
    this.topScores = new Text(
      `${
        Manager.lang === "english"
          ? "Top scores this week"
          : "Toppers van de week"
      }`,
      {
        fontSize: 22,
        // fill: 0xffffff,
        align: "center",
        // fontWeight: "bolder",
        fontFamily: "Madimi One",
        letterSpacing: 1,
      },
    );
    this.topScores.anchor.set(0.5, 0);
    this.topScores.x = this.screenWidth / 2;
    this.topScores.y = 100;

    this.bg = new Graphics()
      .beginFill(0xcee7e1)
      .drawRect(0, 0, this.screenWidth, this.screenHeight);
    this.addChild(this.bg);
    this.selection = new Selection();
    this.selection.x = this.screenWidth / 2 - this.selection.width / 2;
    this.selection.y = 400;
    this.again = Sprite.from("again");
    const AGAIN_SCALE = 80 / this.again.width;
    this.again.scale.x = AGAIN_SCALE;
    this.again.scale.y = AGAIN_SCALE;
    this.again.x = this.screenWidth / 2;
    this.again.y = 600 - 20 - this.again.height / 2;
    this.again.anchor.set(0.5, 0.5);
    this.again.eventMode = "static";
    this.again.cursor = "pointer";
    this.again.tint = 0x000000;
    this.again.on("pointerdown", () => {
      const operators = [];
      for (let operator in Manager.arithmetic) {
        if (Manager.arithmetic[operator]) {
          operators.push(operator);
        } else {
        }
      }
      Manager.operators = operators;
      cb();
    });

    this.addChild(
      this.yourScore,
      this.name,
      this.submit,
      this.topScores,
      this.selection,
      this.again,
    );

    this.organize();
    const BIG_SCALE = this.again.scale.x + 0.05;
    new Tween(this.again.scale)
      .to({ x: BIG_SCALE, y: BIG_SCALE }, 750)
      .repeat(Infinity)
      .start()
      .yoyo(true);
  }

  async organize() {
    const data = await this.getGoals();
    console.log(data);
    console.log(typeof data);
    if (this.allScores) this.removeChild(this.allScores);
    this.allScores = new Container();
    this.addChild(this.allScores);
    if (!data) return;
    // if (!localStorage["highScores"]) return;
    // const scores = localStorage.highScores
    //   .split("||")

    const scores = data
      // .map((a, i) => {
      //   let output;
      //   if (a) output = JSON.parse(a);
      //   return output;
      // })
      .sort((a, b) => {
        return Number(b.score) - Number(a.score);
      });

    for (let i = 0; i < 5; i++) {
      if (scores[i] === undefined) break;
      const score = new Score(140 + 45 * i, scores[i].name, scores[i].score);
      this.allScores.addChild(score);
    }
  }
  // Read
  // var stored = localStorage['myKey'];
  // if (stored) myVar = JSON.parse(stored);
  // else myVar = {a:'test', b: [1, 2, 3]};
  // name:this.name.value
  // Writing :
  //
  // localStorage['myKey'] = JSON.stringify(myVar);
  //
  async getGoals() {
    const API_URL = "https://math-world-highscores.onrender.com/api/scores";
    const response = await axios.get(API_URL, {});
    return response.data;
  }
}

class Score extends Container {
  constructor(y, name, score) {
    super();
    this.y = y;
    this.star = Sprite.from("star-icon");
    this.name = new Text(name, {
      fontSize: 18,
      // fill: 0xffffff,
      align: "center",
      // fontWeight: "bolder",
      fontFamily: "Madimi One",
      letterSpacing: 1,
    });
    this.score = new Text(`3208 punten`, {
      fontSize: 18,
      // fill: 0xffffff,
      align: "center",
      // fontWeight: "bolder",
      fontFamily: "Madimi One",
      letterSpacing: 1,
    });
    this.score.text = `${score || 0} ${
      Manager.lang === "english" ? "points" : "punten"
    }`;
    const SCALE = 35 / this.star.width;
    this.star.scale.x = SCALE;
    this.star.scale.y = SCALE;

    this.star.x = 50;
    this.name.x = this.star.x + this.star.width + 10;
    this.score.x = 400 - this.score.width - 50;

    this.addChild(this.star, this.name, this.score);
  }
}

class Submit extends Container {
  constructor(cb, name, score) {
    super();
    this.score = score;
    this.name = name;
    this.cb = cb;

    this.submitted = false;
    this.border = new Graphics()
      .beginFill(0x4eac8e)
      .drawRoundedRect(0, 0, 80, 35, 3);
    this.transBorder = new Graphics()
      .beginFill(0x2e9c6e)
      .drawRoundedRect(0, 0, 80, 35, 3);
    this.transBorder.alpha = 0;
    this.text = new Text(Manager.lang === "english" ? "Submit" : "Indienen", {
      fill: 0xffffff,
      fontFamily: "Madimi One",
      fontSize: 20,
      fontWeight: "1000",
    });
    this.text.x = this.border.width / 2 - this.text.width / 2;
    this.text.y = this.border.height / 2 - this.text.height / 2;
    this.addChild(this.transBorder);
    this.border.addChild(this.text);
    this.addChild(this.border);
    this.eventMode = "static";
    this.cursor = "pointer";

    this.on("pointerdown", () => {
      this.submit();

      this.on("pointerover", () => {
        new Tween(this.transBorder).to({ alpha: 1 }, 300).start();
      });
    });
    this.on("pointerout", () => {
      new Tween(this.transBorder).to({ alpha: 0 }, 300).start();
    });
  }

  async submit() {
    if (this.submitted) return;

    await this.createGoal(this.name.value, this.score);
    this.submitted = true;
    // if (localStorage["highScores"]) {
    // localStorage["highScores"] =
    //   localStorage["highScores"] +
    //   "||" +
    //   JSON.stringify({ name: this.name.value, score: this.score });
    // } else {
    //   localStorage["highScores"] = JSON.stringify({
    //     name: this.name.value,
    //     score: this.score,
    //   });
    // }
    this.cb();
  }

  async createGoal(namae, score) {
    const API_URL = "https://math-world-highscores.onrender.com/api/scores";
    console.log(score, "mostafa");
    const response = await axios.post(API_URL, {
      name: namae,
      score: score,
    });
    console.log("the data", response);
    return response.data;
  }
}
