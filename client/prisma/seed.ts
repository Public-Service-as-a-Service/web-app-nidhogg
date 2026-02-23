import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.messageRecipient.deleteMany();
  await prisma.message.deleteMany();
  await prisma.group.deleteMany();
  await prisma.employee.deleteMany();
  await prisma.user.deleteMany();

  const user = await prisma.user.create({
    data: {
      email: "user@test.se",
      password: "password",
    },
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
      firstName: "Marcus",
      lastName: "Holm",
      email: "marcus.holm@myndighet.se",
      workMobile: "0705555555",
      workPhone: "08555555",
      workTitle: "Systemtekniker",
    },
    {
      id: 6,
      personId: "P-006",
      orgId: "ORG-IT",
      firstName: "Karin",
      lastName: "Sjöberg",
      email: "karin.sjoberg@myndighet.se",
      workMobile: "0706666666",
      workPhone: "08666666",
      workTitle: "Driftchef",
    },
    {
      id: 7,
      personId: "P-007",
      orgId: "ORG-IT",
      firstName: "Daniel",
      lastName: "Ekström",
      email: "daniel.ekstrom@myndighet.se",
      workMobile: "0707777777",
      workPhone: "08777777",
      workTitle: "CISO",
    },
    {
      id: 8,
      personId: "P-008",
      orgId: "ORG-TEST",
      firstName: "Elin",
      lastName: "Berg",
      email: "elin.berg@demo.se",
      workMobile: "0708888888",
      workPhone: "08888888",
      workTitle: "Testare",
    },
    {
      id: 9,
      personId: "P-009",
      orgId: "ORG-TEST",
      firstName: "Oskar",
      lastName: "Fransson",
      email: "oskar.fransson@demo.se",
      workMobile: "0709999999",
      workPhone: "08999999",
      workTitle: "Testare",
    },
    {
      id: 10,
      personId: "P-010",
      orgId: "ORG-TEST",
      firstName: "Maja",
      lastName: "Karlsson",
      email: "maja.karlsson@demo.se",
      workMobile: "0700000000",
      workPhone: "08000000",
      workTitle: "Testare",
    },
  ];

  await prisma.employee.createMany({
    data: employeesData,
  });

  const employees = await prisma.employee.findMany();
  
  const employeesByEmail = new Map(
    employees
      .filter((employee) => employee.email)
      .map((employee) => [employee.email as string, employee]),
  );

  const now = new Date();
  const minutesAgo = (minutes: number) =>
    new Date(now.getTime() - minutes * 60 * 1000);
  const buildRecipient = (
    email: string,
    deliveryStatus: string,
    receivedAt: Date,
  ) => {
    const employee = employeesByEmail.get(email);
    if (!employee) {
      return null;
    }

    return {
      employeeId: employee.id,
      firstName: employee.firstName,
      lastName: employee.lastName,
      orgId: employee.orgId,
      workTitle: employee.workTitle ?? "Okänd",
      deliveryStatus,
      receivedAt,
    };
  };
  const isRecipient = (
    value: ReturnType<typeof buildRecipient>,
  ): value is NonNullable<ReturnType<typeof buildRecipient>> => value !== null;

  const membershipMap: Record<string, string[]> = {
    Krisgruppen: [
      "anna.andersson@krismyndigheten.se",
      "erik.nilsson@krismyndigheten.se",
      "sofia.lindberg@krismyndigheten.se",
      "johan.persson@krismyndigheten.se",
    ],
    "IT-jour": [
      "marcus.holm@myndighet.se",
      "karin.sjoberg@myndighet.se",
      "daniel.ekstrom@myndighet.se",
    ],
    Testgrupp: [
      "elin.berg@demo.se",
      "oskar.fransson@demo.se",
      "maja.karlsson@demo.se",
    ],
  };

  const groupDescriptions: Record<string, string> = {
    Krisgruppen:
      "Strategisk ledningsgrupp för hantering av nationella kriser och beredskapsfrågor.",
    "IT-jour":
      "Teknisk expertis tillgänglig dygnet runt för att säkra kritisk infrastruktur.",
    Testgrupp:
      "Intern testmiljö för verifiering av systemfunktioner och användarflöden.",
  };

  for (const [groupName, emails] of Object.entries(membershipMap)) {
    await prisma.group.create({
      data: {
        name: groupName,
        description:
          groupDescriptions[groupName] || `Beskrivning för ${groupName}`,
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

  const messageRecipients = [
    {
      title: "Krisarnas kris",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      recipients: [
        buildRecipient(
          "anna.andersson@krismyndigheten.se",
          "delivered",
          minutesAgo(90),
        ),
        buildRecipient(
          "erik.nilsson@krismyndigheten.se",
          "delivered",
          minutesAgo(80),
        ),
        buildRecipient(
          "sofia.lindberg@krismyndigheten.se",
          "pending",
          minutesAgo(70),
        ),
      ].filter(isRecipient),
    },
    {
      title: "Nu är det julkris",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      recipients: [
        buildRecipient("marcus.holm@myndighet.se", "delivered", minutesAgo(50)),
        buildRecipient("karin.sjoberg@myndighet.se", "failed", minutesAgo(45)),
        buildRecipient(
          "daniel.ekstrom@myndighet.se",
          "delivered",
          minutesAgo(40),
        ),
      ].filter(isRecipient),
    },
    {
      title: "Krisen är här",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      recipients: [
        buildRecipient("elin.berg@demo.se", "delivered", minutesAgo(30)),
        buildRecipient("oskar.fransson@demo.se", "delivered", minutesAgo(25)),
        buildRecipient("maja.karlsson@demo.se", "pending", minutesAgo(20)),
      ].filter(isRecipient),
    },
  ];

  for (const message of messageRecipients) {
    await prisma.message.create({
      data: {
        title: message.title,
        content: message.content,
        sender: user.email,
        recipients: {
          create: message.recipients,
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
