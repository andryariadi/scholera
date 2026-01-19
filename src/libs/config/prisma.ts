import { PrismaClient } from "@/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import dotenv from "dotenv";

dotenv.config();

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;

// Step by step setup neon and prisma:
// 1. Get connection string from neon dashboard
// 2. Add connection string to .env file
// 3. Install @prisma/client @prisma/adapter-neon dotenv
// 4. Install prisma --save
// 5. Run pnpm approve-builds and choose '@prisma/engines' and 'prisma'
// 6. Run pnpm prisma init
// 7. Design database schema
// 8. Run pnpm prisma migrate dev
// 9. Run pnpm prisma generate
// 10. Setup prisma client
// 11. If hava data seed run pnpm prisma db seed (assumes you have seed.ts file in prisma folder)
// 12. If have changes in schema.prisma run pnpm prisma migrate dev and run pnpm prisma generate

// Othe commands:
// pnpm prisma migrate reset for reset database
// pnpm prisma db seed for seed database
// pnpm prisma studio for open studio
// pnpm prisma db push for push database
// pnpm prisma migrate deploy for deploy database
