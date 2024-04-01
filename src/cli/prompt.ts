import inquirer from "inquirer";
import {
  createQuestions,
  deleteQuestions,
  questions,
} from "./questions/questions.js";

const prompt = inquirer.createPromptModule();

const answers = await prompt(questions);

if (answers.action === "Create") {
  const createAnswers = await prompt(createQuestions);
  console.log("Creating delivery...");
  console.log(createAnswers);
}

if (answers.action === "Delete") {
  const deleteAnswers = await prompt(deleteQuestions);
  console.log("Deleting delivery...");
  console.log(deleteAnswers);
}
