import { Delivery } from "../../types/Delivery";

const groupBy = (
  deliveries: Delivery[],
  key: keyof Delivery,
): Record<string, Delivery[]> => {
  return deliveries.reduce(
    (deliveriesAccumulated: Record<string, Delivery[]>, delivery: Delivery) => {
      const keyValue = String(delivery[key]);

      deliveriesAccumulated[keyValue] = [
        ...(deliveriesAccumulated[keyValue] || []),
        delivery,
      ];

      return deliveriesAccumulated;
    },
    {},
  );
};

export default groupBy;
