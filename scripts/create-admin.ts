import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("h@rsharora", 10);

  await prisma.user.create({
    data: {
      name: "Harsh Arora",
      email: "Harsharora@nomichi.com",
      passwordHash: password,
      role: "ADMIN",
    },
  });

  console.log("Admin created");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());