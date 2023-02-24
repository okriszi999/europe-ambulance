const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  return prisma.whitelistUser.create({
    data: {
      email: "o.kriszi99@gmail.com",
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
