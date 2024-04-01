import { QuestionCollection } from "inquirer";

export const questions: QuestionCollection = [
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

export const deleteQuestions = [
  {
    type: "confirm",
    name: "confirm delete",
    message: "Are you sure you want to delete a delivery?",
  },
];

export const createQuestions = [
  {
    type: "confirm",
    name: "partner",
    message: "Is with a partner?",
  },
];
