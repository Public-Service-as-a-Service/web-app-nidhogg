import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.groupMember.deleteMany();
  await prisma.group.deleteMany();
  await prisma.employee.deleteMany();
  await prisma.message.deleteMany();
  await prisma.user.deleteMany();

  const user = await prisma.user.create({
    data: {
      email: "user@test.se",
      password: "password",
    },
  });

  await prisma.message.createMany({
    data: [
      {
        title: "Krisarnas kris",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dapibus ultricies accumsan.",
        userId: user.id,
      },
      {
        title: "Nu är det julkris",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dapibus ultricies accumsan.",
        userId: user.id,
      },
      {
        title: "Krisen är här",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dapibus ultricies accumsan.",
        userId: user.id,
      },
    ],
  });

  await prisma.group.createMany({
    data: [
      {
        name: "Krisgruppen",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
      {
        name: "IT-jour",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
      {
        name: "Testgrupp",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
    ],
  });

  const createdGroups = await prisma.group.findMany();

  const employeesData = [
    { email: "anna.andersson@krismyndigheten.se", telephone: "0701111111" },
    { email: "erik.nilsson@krismyndigheten.se", telephone: "0702222222" },
    { email: "sofia.lindberg@krismyndigheten.se", telephone: "0703333333" },
    { email: "johan.persson@krismyndigheten.se", telephone: "0704444444" },

    { email: "oncall.it@myndighet.se", telephone: "0705555555" },
    { email: "driftansvarig@myndighet.se", telephone: "0706666666" },
    { email: "it.sakerhet@myndighet.se", telephone: "0707777777" },

    { email: "test.anvandare1@demo.se", telephone: "0708888888" },
    { email: "test.anvandare2@demo.se", telephone: "0709999999" },
    { email: "test.anvandare3@demo.se", telephone: "0700000000" },
  ];

  await prisma.employee.createMany({
    data: employeesData,
  });

  const employees = await prisma.employee.findMany();

  const membershipMap: Record<string, string[]> = {
    Krisgruppen: [
      "anna.andersson@krismyndigheten.se",
      "erik.nilsson@krismyndigheten.se",
      "sofia.lindberg@krismyndigheten.se",
      "johan.persson@krismyndigheten.se",
    ],
    "IT-jour": [
      "oncall.it@myndighet.se",
      "driftansvarig@myndighet.se",
      "it.sakerhet@myndighet.se",
    ],
    Testgrupp: [
      "test.anvandare1@demo.se",
      "test.anvandare2@demo.se",
      "test.anvandare3@demo.se",
    ],
  };

  for (const group of createdGroups) {
    const memberEmails = membershipMap[group.name];
    if (!memberEmails) continue;

    const groupMembers = employees
      .filter((e) => memberEmails.includes(e.email))
      .map((employee) => ({
        groupId: group.id,
        employeeId: employee.id,
      }));

    await prisma.groupMember.createMany({
      data: groupMembers,
    });
  }

  console.log("✅ Seeding done");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
