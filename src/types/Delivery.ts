import { UUID } from "crypto";

export type Urls = {
  gitHub: string;
  production: string;
};

export type Delivery = {
  id: UUID;
  owner: string;
  week: number;
  hasPartner: boolean;
  firstPartnerName?: string;
  secondPartnerName?: string;
  deliveryDate: Date;
  frontUrls?: Urls;
  backUrls?: Urls;
};

export type DeliveryCreateDto = Omit<Delivery, "id">;

export type DeliveryDeleteDto = Pick<Delivery, "owner" | "week">;
