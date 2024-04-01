import inquirer from "inquirer";
import { questions } from "./questions/questions.js";
import { createDelivery, deleteDelivery } from "../deliveryService/requests.js";
import { DeliveryCreateDto } from "../types/Delivery.js";

export const run = async () => {
  const prompt = inquirer.createPromptModule();

  const answers = await prompt(questions);

  if (answers["action"] === "delete" && !answers["confirmDelete"]) {
    console.log("Delete delivery cancelled");
    return;
  }

  if (answers["confirmDelete"]) {
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

  if (answers["action"] === "create" && !answers["confirmCreate"]) {
    console.log("Create delivery cancelled");
    return;
  }

  if (answers["confirmCreate"]) {
    const deliverToCreate: DeliveryCreateDto = {
      owner: answers.name,
      week: answers.week,
      frontProductionUrl: answers.frontProductionUrl,
      frontRepoUrl: answers.frontRepoUrl,
      backProductionUrl: answers.backProductionUrl,
      backRepoUrl: answers.backRepoUrl,
      firstTeammateName: answers.firstPartnerName,
      secondTeammateName: answers.secondPartnerName,
    };

    try {
      await createDelivery(deliverToCreate);
      console.log("Successfull deliver it...");
    } catch (error) {
      console.error(`Failed to create delivery. Error: ${error.message}`);
    }
  }
};
