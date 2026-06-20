import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hash = await bcrypt.hash("admin123", 10);

  await prisma.user.create({
    data: {
      name: "Harsh Admin",
      email: "Harsh@nomichi.com",
      passwordHash: hash,
      role: "ADMIN",
    },
  });

  console.log("Admin created");
}

main();