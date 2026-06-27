import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const hash = await bcrypt.hash("NewPassword123", 10);

  await prisma.user.update({
    where: {
      email: "admin@nomichi.com",
    },
    data: {
      passwordHash: hash,
    },
  });

  console.log("Password Updated");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());