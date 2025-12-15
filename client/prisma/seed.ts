import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: "user@test.se" },
    update: {},
    create: {
      email: "user@test.se",
      password: "password",
    },
  });

  await prisma.message.createMany({
    data: [
      {
        title: "Krisarnas kris 1",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dapibus ultricies accumsan.",
        userId: user.id,
      },
      {
        title: "Krisarnas kris 2",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dapibus ultricies accumsan.",
        userId: user.id,
      },
      {
        title: "Krisarnas kris 3",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dapibus ultricies accumsan.",
        userId: user.id,
      },
    ],
  });

  await prisma.group.createMany({
    data: [
      {
        title: "Krisgruppen",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        ownerId: user.id,
      },
      {
        title: "IT-jour",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        ownerId: user.id,
      },
      {
        title: "Testgrupp",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        ownerId: user.id,
      },
    ],
  });
}

main();
