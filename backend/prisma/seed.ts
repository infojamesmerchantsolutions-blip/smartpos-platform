import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("Admin@123", 12);

  const merchant = await prisma.merchant.upsert({
    where: {
      email: "admin@smartpos.com"
    },
    update: {},
    create: {
      businessName: "SmartPOS Demo",
      email: "admin@smartpos.com",
      phone: "+2348000000000"
    }
  });

  await prisma.user.upsert({
    where: {
      email: "admin@smartpos.com"
    },
    update: {},
    create: {
      name: "System Administrator",
      email: "admin@smartpos.com",
      password,
      role: UserRole.SUPER_ADMIN,
      merchantId: merchant.id
    }
  });

  console.log("Database seeded successfully.");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
