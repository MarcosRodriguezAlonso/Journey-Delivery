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
  }

  if (answers.action === "Delete") {
    const deleteAnswers = await prompt(deleteQuestions);

    if (!deleteAnswers["confirm delete"]) {
      console.log("Delete delivery cancelled");
      return;
    }

    console.log("Deleting delivery starts...");

    try {
      await deleteDelivery({
        owner: answers.name,
        week: answers.week,
      });

      console.log("Delivery deleted successfully");
    } catch (error) {
      console.error(`Failed to delete delivery. Error: ${error.message}`);
    }
  }
};
