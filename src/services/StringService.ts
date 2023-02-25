import { Client } from "@prisma/client";

export function getFullname(client: Client | null) {
  return `${client?.firstName} ${client?.lastName}`;
}
