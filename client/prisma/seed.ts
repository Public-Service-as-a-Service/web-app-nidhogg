import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.member.deleteMany();
  await prisma.group.deleteMany();
  await prisma.message.deleteMany();

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

  const createdGroups = await prisma.group.findMany();

  const membersData = [
    {
      groupTitle: "Krisgruppen",
      members: [
        { email: "anna.andersson@krismyndigheten.se" },
        { email: "erik.nilsson@krismyndigheten.se" },
        { email: "sofia.lindberg@krismyndigheten.se" },
        { email: "johan.persson@krismyndigheten.se" },
      ],
    },
    {
      groupTitle: "IT-jour",
      members: [
        { email: "oncall.it@myndighet.se" },
        { email: "driftansvarig@myndighet.se" },
        { email: "it.sakerhet@myndighet.se" },
      ],
    },
    {
      groupTitle: "Testgrupp",
      members: [
        { email: "test.anvandare1@demo.se" },
        { email: "test.anvandare2@demo.se" },
        { email: "test.anvandare3@demo.se" },
      ],
    },
  ];

  for (const group of createdGroups) {
    const groupMembers = membersData.find((g) => g.groupTitle === group.title);

    if (!groupMembers) continue;

    await prisma.member.createMany({
      data: groupMembers.members.map((member) => ({
        groupId: group.id,
        email: member.email,
      })),
    });
  }
}

main();
