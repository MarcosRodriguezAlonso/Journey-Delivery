import axios from "axios";
import { AxiosHttpClient } from "./http-client/axiosHttpClient.js";
import { DeliveryCreateDto, DeliveryDeleteDto } from "./types/Delivery.js";
import buildUrl from "./http-client/buildUrl/buildUrl.js";
import { baseUrl } from "./config/apiPaths/apiPaths.js";

const axiosHttpClient = new AxiosHttpClient(axios.create());
const deliveriesUrl = buildUrl(baseUrl, "/deliveries");

export const getDeliveries = async () => {
  return await axiosHttpClient.get(deliveriesUrl);
};

export const createDelivery = async (deliveryCreateDto: DeliveryCreateDto) => {
  return await axiosHttpClient.post(deliveriesUrl, deliveryCreateDto);
};

export const deleteDelivery = async ({ owner, week }: DeliveryDeleteDto) => {
  const query = {
    owner,
    week: week.toString(),
  };

  const deliveriesUrlToDelete = buildUrl(baseUrl, "/deliveries", query);

  return await axiosHttpClient.delete(deliveriesUrlToDelete);
};
