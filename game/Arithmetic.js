import { Container, Graphics, Text } from "pixi.js";
import { Manager } from "../manager";
import { Sign } from "./Items";

export class Arithmetic extends Container {
  constructor(y) {
    super();
    this.screenWidth = Manager.width;
    this.screenHeight = Manager.height;
    this.y = y;
    this.body = { type: "arithmetic" };
    this.operators = [...Manager.operators];
    this.isArithmetic = true;
    this.text = new Text("", {
      fill: 0xcccccc,
      fontSize: 32,
      fontWeight: "bolder",
      fontFamily: "Madimi One",
      letterSpacing: 2,
    });
    this.values = [];
    this.icons = { plus: "+", minus: "-", times: "×", by: "÷" };
    this.operands = [];
    const lenChoices = 10;
    this.result = 0;
    this.choices = [];
    this.choiceWidth = (this.screenWidth / lenChoices) * 2;
    this.choiceHeight = 30;
    this.sceneWidth = this.choiceWidth * lenChoices;
    this.idx = 0;
    this.pivot.x = this.choiceWidth * 2;
    this.makeOp();
    for (let i = 0; i < 10; i++) {
      const choice = new Choice(
        i * this.choiceWidth,
        0,
        this.choiceWidth,
        this.choiceHeight,
        this.values[i],
      );
      this.addChild(choice);
      this.choices.push(choice);
    }
    this.sign = new Sign(y, this.operator);
    this.sign.x += this.pivot.x - this.sign.shape.width / 2;
    this.sign.y += 240;
    this.text.x = Manager.width / 2 - this.text.width / 2 + this.pivot.x;
    this.text.y = 120;

    this.addChild(
      this.text,
      // this.sign
    );
  }

  update() {
    this.choices.forEach((choice) => {
      choice.x = (choice.x + 2) % this.sceneWidth;
      if (
        -this.pivot.x + choice.x > this.screenWidth / 2 - choice.width &&
        -this.pivot.x + choice.x < this.screenWidth / 2
      ) {
        this.current = choice.val;
      }
    });
    // console.log(this.current);
  }

  makeOp() {
    this.operator =
      this.operators[Math.trunc(Math.random() * this.operators.length)];

    this.createOperands();
    while (
      Manager.usedOps.has(this.operands[0] + this.operator + this.operands[1])
    ) {
      this.createOperands();
    }
    this.text.text =
      this.operands[0] +
      " " +
      this.icons[this.operator] +
      " " +
      this.operands[1];

    switch (this.operator) {
      case "plus":
        this.result = this.operands[0] + this.operands[1];
        const rand = Math.trunc(Math.random() * 21);
        const rand2 = Math.trunc(Math.random() * 21);
        const rand3 = Math.trunc(Math.random() * 21);
        this.values.push(rand === this.result ? rand - 1 : rand);
        this.values.push(rand2 === this.result ? rand2 - 2 : rand2);
        this.values.push(
          rand3 === this.result ? rand3 + Math.trunc(Math.random() * 5) : rand3,
        );
        break;
      case "minus":
        this.result = this.operands[0] - this.operands[1];
        const rand4 = Math.trunc(Math.random() * 21);
        const rand5 = Math.trunc(Math.random() * 21);
        const rand6 = Math.trunc(Math.random() * 21);
        this.values.push(rand4 === this.result ? rand4 - 1 : rand4);
        this.values.push(rand5 === this.result ? rand5 - 2 : rand5);
        this.values.push(
          rand6 === this.result ? rand6 + Math.trunc(Math.random() * 5) : rand6,
        );
        break;
      case "times":
        this.result = this.operands[0] * this.operands[1];
        this.values.push(this.operands[1] * (this.operands[0] + 1));

        if (String(this.result).length === 1) {
          this.values.push(
            Number(String(this.result) * Math.trunc(Math.random() * 3)),
          );
        } else {
          this.values.push(
            Number(String(this.result).split("").reverse().join("")),
          );
        }
        break;
      case "by":
        this.result = this.operands[0] / this.operands[1];
        this.values.push(this.result + this.operands[1]);

        if (String(this.result).length === 1) {
          this.values.push(
            Number(String(this.result) * Math.trunc(Math.random() * 3)),
          );
        } else {
          this.values.push(
            Number(String(this.result).split("").reverse().join("")),
          );
        }
        break;
    }
    this.values.push(this.result);
    this.values.push(this.result + Math.trunc(Math.random() * 10) + 1);
    this.values.push(this.result + Math.trunc(Math.random() * 20) + 1);
    for (let i = 0, l = this.values.length; i < l; i++) {
      this.values.push(this.values[i]);
    }
    Manager.usedOps.add(this.operands[0] + "+" + this.operands[1]);
  }

  createOperands() {
    this.operator =
      this.operators[Math.trunc(Math.random() * this.operators.length)];
    const ceil1 =
      this.operator === "minus" || this.operator === "plus" ? 20 : 10;
    this.operands[0] =
      this.operator === "plus"
        ? 20 - Math.ceil(Math.random() * ceil1)
        : Math.trunc(Math.random() * ceil1);
    const ceil2 =
      this.operator === "minus"
        ? this.operands[0]
        : this.operator === "plus"
          ? 20 - this.operands[0]
          : 10;
    this.operands[1] = Math.trunc(Math.random() * ceil2) + 1;

    if (this.operator === "minus") {
      this.operands[0] = Math.max(this.operands[0], 1); // prevent negative op
    }
    if (this.operator === "by") {
      this.operands[0] = this.operands[0] * this.operands[1];
    }

    switch (this.operator) {
      case "plus":
        this.operands[0] = Math.trunc(Math.random() * 20);
        this.operands[1] =
          Math.trunc(Math.random() * (20 - Math.trunc(this.operands[0]))) + 1;
        break;
      case "minus":
        this.operands[0] = Math.trunc(Math.random() * 20) + 1;
        this.operands[1] =
          this.operands[0] - Math.trunc(Math.random() * this.operands[0]);
        break;
      case "times":
        this.operands[0] = Math.trunc(Math.random() * 10) + 1;
        this.operands[1] = Math.trunc(Math.random() * 10) + 1;
        break;
      case "by":
        this.operands[1] = Math.trunc(Math.random() * 10) + 1;
        this.operands[0] =
          this.operands[1] * (Math.trunc(Math.random() * 10) + 1);
        break;
    }
  }
}

class Choice extends Container {
  constructor(x, y, width, height, val) {
    super();
    this.x = x;
    this.y = y;
    this.val = val;
    this.text = new Text(this.val, {
      fontWeight: "400",
      fontFamily: "Madimi One",
      letterSpacing: 2,
    });
    this.text.x = width / 2 - this.text.width / 2;
    this.text.y = height / 2 - this.text.height / 2;
    this.sprite = new Graphics()
      .beginFill(0xcccccc)
      .drawRoundedRect(0, 0, width, height);
    this.sprite.eventMode = "static";
    this.sprite.cursor = "pointer";

    this.minWidth = width;
    this.maxWidth = Math.min(this.sprite.width, this.minWidth * 2);
    this.addChild(this.sprite, this.text);
  }

  update() {}
}
// Possible ways to meet her again:
//
// Best courses of action (slightly delayed):
// - Meet in OCE
// - Message her phone (OCE does not start again)

// Remote
// Contact through oussama
// Contact through binome
// Luck:
// Meet in patho
// Meet in faculty
// Meet in hospital
