import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../../generated/prisma/index.js";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
	throw new Error("DATABASE_URL não definido. Configure a conexão MySQL no arquivo backend/.env.");
}

const adapter = new PrismaMariaDb(databaseUrl);

const prisma = new PrismaClient({ adapter });

export default prisma;
