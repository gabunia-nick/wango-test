import { PrismaClient } from "@prisma/client"

const prismaClient = new PrismaClient();

export const getDatabase = () => prismaClient;