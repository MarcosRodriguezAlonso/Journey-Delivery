export type Delivery = {
  id: number;
  owner: string;
  week: number;
  firstTeammateName?: string;
  secondTeammateName?: string;
  trelloUrl?: string;
  frontRepoUrl?: string;
  frontProductionUrl?: string;
  backRepoUrl?: string;
  backProductionUrl?: string;
  createdAt: Date;
};

export type DeliveryCreateDto = Omit<Delivery, "id" | "createdAt">;

export type DeliveryDeleteDto = Pick<Delivery, "owner" | "week">;
