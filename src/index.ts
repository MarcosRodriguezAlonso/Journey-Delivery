import inquirer, { Question, QuestionCollection } from "inquirer";

const prompt = inquirer.createPromptModule();
const questions: QuestionCollection = [
  {
    type: "list",
    name: "name",
    message: "What's your name?",
    choices: ["Clara", "Marcos", "Eric"],
  },
  {
    type: "list",
    name: "Week",
    message: "What week are we in?",
    choices: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  },
  {
    type: "list",
    name: "action",
    message: "What do you want to do?",
    choices: ["Create", "Delete"],
  },
];

const deleteQuestions = [
  {
    type: "confirm",
    name: "confirm delete",
    message: "Are you sure you want to delete a delivery?",
  },
];

const createQuestions = [
  {
    type: "confirm",
    name: "partner",
    message: "Is with a partner?",
  },
];

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
