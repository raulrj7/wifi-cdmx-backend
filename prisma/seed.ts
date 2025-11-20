import { prisma } from './../src/core/database/prisma';
import "dotenv/config";
import bcrypt from "bcrypt";

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  await prisma.user.upsert({
    where: { email: "admin@cdmx.com" },
    update: {},
    create: {
      email: "admin@cdmx.com",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log("Usuario admin creado o actualizado");
}

main()
  .catch(console.error)
  .finally(async () => await prisma.$disconnect());

