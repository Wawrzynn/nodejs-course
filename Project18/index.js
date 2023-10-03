#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

let playerName;

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

async function Welcome() {
  const rainbowTitle = chalkAnimation.rainbow(
    "Who wants to be a JS Millionaire! \n"
  );

  await sleep(2000);
  rainbowTitle.stop();

  console.log(`
        ${chalk.bgBlue("HOW TO PLAY")}
        I am a process on your computer.
        If you get any question wrong i will be ${chalk.bgRed("KILLED")}!
        So don't get any questions wrong.
    `);
}

async function askName() {
  const answers = await inquirer.prompt({
    name: "name",
    type: "input",
    message: "What is your name?",
    default() {
      return "Player";
    },
  });
  playerName = answers.name;
}

async function question1() {
  const answers = await inquirer.prompt({
    name: "question1",
    type: "list",
    message: "JavaScript was created in 10 days ten released on\n",
    choices: ["May 23rd 1995", "Nov 24th 1995", "Dec 4th 1995", "Dec 17 1996"],
  });

  return handleAnswer(answers.question1 == "Dec 4th 1995");
}

async function handleAnswer(isCorrect) {
  const spinner = createSpinner("Checking answer...").start();
  await sleep(2000);

  if (isCorrect) {
    spinner.success({ text: "Correct!" });
  } else {
    spinner.error({ text: "Wrong! You lose." });
    process.exit(1);
  }
}

async function question2() {
  const answers = await inquirer.prompt({
    name: "question_2",
    type: "list",
    message: 'What is x? var x = 1_1 + "1" + Number(1)\n',
    choices: ["4", '"4"', '"1111"', "69420"],
  });
  return handleAnswer(answers.question_2 === '"1111"');
}

async function question3() {
  const answers = await inquirer.prompt({
    name: "question_3",
    type: "list",
    message: `What is the first element in the array? ['🐏', '🦙', '🐍'].length = 0\n`,
    choices: ["0", "🐏", "🐍", "undefined"],
  });

  return handleAnswer(answers.question_3 === "undefined");
}

async function question4() {
  const answers = await inquirer.prompt({
    name: "question_4",
    type: "list",
    message: "Which of the following is NOT a primitive type?\n",
    choices: [
      "boolean",
      "number",
      "null",
      "object", // Correct
    ],
  });
  return handleAnswer(answers.question_4 === "object");
}

async function question5() {
  const answers = await inquirer.prompt({
    name: "question_5",
    type: "list",
    message:
      "JS is a high-level single-threaded, garbage-collected,\n" +
      "interpreted(or just-in-time compiled), prototype-based,\n" +
      "multi-paradigm, dynamic language with a ____ event loop\n",
    choices: ["multi-threaded", "non-blocking", "synchronous", "promise-based"],
  });

  return handleAnswer(answers.question_5 === "non-blocking");
}

function winner() {
    console.clear();
    figlet(`Congrats , ${playerName} !\n $ 1 , 0 0 0 , 0 0 0`, (err, data) => {
      console.log(gradient.pastel.multiline(data) + '\n');
  
      console.log(
        chalk.green(
          `Programming isn't about what you know; it's about making the command line look cool`
        )
      );
      process.exit(0);
    });
  }

// Game start
console.clear();
await Welcome();
await askName();
await question1();
await question2();
await question3();
await question4();
await question5();
winner();
