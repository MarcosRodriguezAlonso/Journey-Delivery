import { QuestionCollection } from "inquirer";

const studentChoices = ["Clara", "Marcos", "Eric"];
const actions = ["create", "delete", "read"] as const;
export type Action = (typeof actions)[number];

export const questions: QuestionCollection = [
  {
    type: "list",
    name: "name",
    message: "What's your name?",
    choices: studentChoices,
  },
  {
    type: "list",
    name: "week",
    message: "What week are we in?",
    choices: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  },
  {
    type: "list",
    name: "action",
    message: "What do you want to do?",
    choices: actions,
  },
  {
    type: "confirm",
    name: "confirmDelete",
    message: "Are you sure you want to delete a delivery?",
    when: (answers: { action: Action }) => answers.action === "delete",
  },
  {
    type: "list",
    name: "numberOfTeammates",
    message: "How many team members are working with you?",
    choices: [0, 1, 2],
    when: (answers: { action: Action }) => answers.action === "create",
  },
  {
    type: "list",
    name: "firstTeammateName",
    message: "What's the name of your first teammate?",
    choices: studentChoices,
    when: (answers: { numberOfTeammates: number }) =>
      answers.numberOfTeammates > 0,
  },
  {
    type: "list",
    name: "secondTeammateName",
    message: "What's the name of your second teammate?",
    choices: studentChoices,
    when: (answers: { numberOfTeammates: number }) =>
      answers.numberOfTeammates > 1,
  },
  {
    type: "confirm",
    name: "hasFront",
    message: "Does the delivery have a front-end?",
    when: (answers: { action: Action }) => answers.action === "create",
  },
  {
    type: "input",
    name: "repoFrontUrl",
    message: "What's the repo URL?",
    when: (answers: { hasFront: boolean }) => answers.hasFront,
  },
  {
    type: "input",
    name: "prodFrontUrl",
    message: "What's the production URL?",
    when: (answers: { hasFront: boolean }) => answers.hasFront,
  },
  {
    type: "confirm",
    name: "hasBack",
    message: "Does the delivery have a back-end?",
    when: (answers: { action: Action }) => answers.action === "create",
  },
  {
    type: "input",
    name: "repoBackUrl",
    message: "What's the repo URL?",
    when: (answers: { hasBack: boolean }) => answers.hasBack,
  },
  {
    type: "input",
    name: "prodBackUrl",
    message: "What's the production URL?",
    when: (answers: { hasBack: boolean }) => answers.hasBack,
  },
  {
    type: "confirm",
    name: "confirmCreate",
    message: "Are you sure you want deliver?",
    when: (answers: { action: Action }) => answers.action === "create",
  },
];
