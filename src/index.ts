import { createDelivery, deleteDelivery, getDeliveries } from "./requests.js";
import { DeliveryCreateDto } from "./types/Delivery.js";

console.log(await getDeliveries());

const newDelivery: DeliveryCreateDto = {
  deliveryDate: new Date(),
  hasPartner: false,
  owner: "John Doe",
  week: 1,
  backUrls: {
    gitHub: "https://github.com",
    production: "https://production.com",
  },
  frontUrls: {
    gitHub: "https://github.com",
    production: "https://production.com",
  },
};

console.log(await deleteDelivery({ owner: "John Doe", week: 1 }));

console.log(await getDeliveries());
