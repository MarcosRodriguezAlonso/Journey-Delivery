import inquirer from "inquirer";
import {
  createQuestions,
  deleteQuestions,
  questions,
} from "./questions/questions.js";
import { deleteDelivery } from "../deliveryService/requests.js";

export const run = async () => {
  const prompt = inquirer.createPromptModule();

  const answers = await prompt(questions);

  if (answers.action === "Create") {
    const createAnswers = await prompt(createQuestions);
    console.log("Creating delivery...");
    console.log(createAnswers);
  }

  if (answers.action === "Delete") {
    const deleteAnswers = await prompt(deleteQuestions);
    console.log("Deleting delivery starts...");

    try {
      await deleteDelivery({
        owner: answers.name,
        week: answers.Week,
      });

      console.log("Delivery deleted successfully");
    } catch (error) {
      console.log("Error deleting delivery");
    }
  }
};
