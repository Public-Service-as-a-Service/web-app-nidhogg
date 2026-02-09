import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
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
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        userId: user.id,
      },
      {
        title: "Nu är det julkris",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        userId: user.id,
      },
      {
        title: "Krisen är här",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        userId: user.id,
      },
    ],
  });

  const employeesData = [
    {
      id: 1,
      personId: "P-001",
      orgId: "ORG-1",
      firstName: "Anna",
      lastName: "Andersson",
      email: "anna.andersson@krismyndigheten.se",
      workMobile: "0701111111",
      workPhone: "08111111",
      workTitle: "Krisledare",
    },
    {
      id: 2,
      personId: "P-002",
      orgId: "ORG-1",
      firstName: "Erik",
      lastName: "Nilsson",
      email: "erik.nilsson@krismyndigheten.se",
      workMobile: "0702222222",
      workPhone: "08222222",
      workTitle: "Analytiker",
    },
    {
      id: 3,
      personId: "P-003",
      orgId: "ORG-1",
      firstName: "Sofia",
      lastName: "Lindberg",
      email: "sofia.lindberg@krismyndigheten.se",
      workMobile: "0703333333",
      workPhone: "08333333",
      workTitle: "Kommunikatör",
    },
    {
      id: 4,
      personId: "P-004",
      orgId: "ORG-1",
      firstName: "Johan",
      lastName: "Persson",
      email: "johan.persson@krismyndigheten.se",
      workMobile: "0704444444",
      workPhone: "08444444",
      workTitle: "Logistikansvarig",
    },
    {
      id: 5,
      personId: "P-005",
      orgId: "ORG-IT",
      firstName: "IT",
      lastName: "OnCall",
      email: "oncall.it@myndighet.se",
      workMobile: "0705555555",
      workPhone: "08555555",
      workTitle: "Systemtekniker",
    },
    {
      id: 6,
      personId: "P-006",
      orgId: "ORG-IT",
      firstName: "Drift",
      lastName: "Ansvarig",
      email: "driftansvarig@myndighet.se",
      workMobile: "0706666666",
      workPhone: "08666666",
      workTitle: "Driftchef",
    },
    {
      id: 7,
      personId: "P-007",
      orgId: "ORG-IT",
      firstName: "Säkerhets",
      lastName: "Expert",
      email: "it.sakerhet@myndighet.se",
      workMobile: "0707777777",
      workPhone: "08777777",
      workTitle: "CISO",
    },
    {
      id: 8,
      personId: "P-008",
      orgId: "ORG-TEST",
      firstName: "Test",
      lastName: "Användare 1",
      email: "test.anvandare1@demo.se",
      workMobile: "0708888888",
      workPhone: "08888888",
      workTitle: "Testare",
    },
    {
      id: 9,
      personId: "P-009",
      orgId: "ORG-TEST",
      firstName: "Test",
      lastName: "Användare 2",
      email: "test.anvandare2@demo.se",
      workMobile: "0709999999",
      workPhone: "08999999",
      workTitle: "Testare",
    },
    {
      id: 10,
      personId: "P-010",
      orgId: "ORG-TEST",
      firstName: "Test",
      lastName: "Användare 3",
      email: "test.anvandare3@demo.se",
      workMobile: "0700000000",
      workPhone: "08000000",
      workTitle: "Testare",
    },
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

  for (const [groupName, emails] of Object.entries(membershipMap)) {
    await prisma.group.create({
      data: {
        name: groupName,
        description: groupName,
        createdBy: user.email,
        userId: user.id,
        employees: {
          connect: employees
            .filter((e) => e.email && emails.includes(e.email))
            .map((e) => ({ id: e.id })),
        },
      },
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
