import inquirer from "inquirer";
import { questions } from "./questions/questions.js";
import {
  createDelivery,
  deleteDelivery,
  getDeliveries,
} from "../deliveryService/requests.js";
import { Delivery, DeliveryCreateDto } from "../types/Delivery.js";
import groupBy from "./groupBy/groupBy.js";
import chalk from "chalk";

export const run = async () => {
  const prompt = inquirer.createPromptModule();

  const answers = await prompt(questions);

  if (answers["action"] === "delete" && !answers["confirmDelete"]) {
    console.log(chalk.bold("Delete delivery cancelled"));
    return;
  }

  if (answers["confirmDelete"]) {
    console.log("Deleting delivery starts...");

    try {
      await deleteDelivery({
        owner: answers.name,
        week: answers.week,
      });

      console.log(chalk.bgGreen("Delivery deleted successfully"));
    } catch (error) {
      console.error(
        chalk.bgRed(`Failed to delete delivery. Error: ${error.message}`),
      );
    }
  }

  if (answers["action"] === "create" && !answers["confirmCreate"]) {
    console.log(chalk.bgGreen("Create delivery cancelled"));
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
      firstTeammateName: answers.firstTeammateName,
      secondTeammateName: answers.secondTeammateName,
    };

    try {
      await createDelivery(deliverToCreate);
      console.log(chalk.bgGreen("Successfull deliver it..."));
    } catch (error) {
      console.error(
        chalk.bgRed(`Failed to create delivery. Error: ${error.message}`),
      );
    }
  }

  if (answers["action"] === "read") {
    try {
      const deliveries: Delivery[] = await getDeliveries();

      const printDeliveryInfo = (delivery: Delivery) => {
        const hasTeammates =
          delivery.firstTeammateName || delivery.secondTeammateName;
        const hasFront = delivery.frontRepoUrl || delivery.frontProductionUrl;
        const hasBack = delivery.backRepoUrl || delivery.backProductionUrl;

        if (!hasFront && !hasBack) {
          return;
        }

        console.log(chalk.bgBlue(`\n  Owner ${delivery.owner}:`));

        if (hasFront) {
          console.log(
            chalk.bold(`    Repo Front: `) + `${delivery.frontRepoUrl}`,
          );
          console.log(
            chalk.bold(`    Production Front: `) +
              `${delivery.frontProductionUrl}`,
          );
        }

        if (hasBack) {
          console.log(
            chalk.bold(`    Repo Back: `) + `${delivery.backRepoUrl}`,
          );
          console.log(
            chalk.bold(`    Production Back: `) +
              `${delivery.backProductionUrl}`,
          );
        }

        if (hasTeammates) {
          console.log(
            chalk.bold.yellowBright(
              `    Team: ${delivery.firstTeammateName}${hasTeammates ? " & " : "."}${delivery.secondTeammateName}`,
            ),
          );
        }
      };

      const printOwnerDeliveries = ([owner, deliveriesByOwner]: [
        string,
        Delivery[],
      ]) => {
        deliveriesByOwner.forEach(printDeliveryInfo);
      };

      const printWeekDeliveries = ([week, deliveriesInWeek]: [
        string,
        Delivery[],
      ]) => {
        console.log(chalk.greenBright(`Week ${week}:`));
        const groupedByOwner = groupBy(deliveriesInWeek, "owner");
        Object.entries(groupedByOwner).forEach(printOwnerDeliveries);
      };

      const groupedByWeek = groupBy(deliveries, "week");
      Object.entries(groupedByWeek).forEach(printWeekDeliveries);
    } catch (error) {
      console.error(
        chalk.red(`Failed to read deliveries. Error: ${error.message}`),
      );
    }
  }
};
