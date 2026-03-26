// Valid fake JWT with payload {"email":"user@test.se","role":"USER"}
const FAKE_JWT =
  "eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InVzZXJAdGVzdC5zZSIsInJvbGUiOiJVU0VSIn0.fakesignature";

beforeEach(() => {
  cy.intercept("GET", "**/api/**", {
    statusCode: 200,
    body: [],
  }).as("backgroundApi");
});

describe("Dashboard - Message List Rendering", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/api/notifier/messages*", {
      statusCode: 200,
      fixture: "messages.json",
    }).as("messages");

    cy.intercept("POST", "**/api/**/login", {
      statusCode: 200,
      body: { success: true },
    }).as("loginRequest");

    cy.intercept("GET", "**/api/auth/me", {
      statusCode: 200,
      body: { email: "user@test.se", role: "USER" },
    }).as("meRequest");

    cy.visit("http://localhost:3000");
    cy.get('input[type="email"]').type("user@test.se");
    cy.get('input[type="password"]').type("password");
    cy.setCookie("token", FAKE_JWT);
    cy.get('button[type="submit"]').click();
    cy.wait("@loginRequest");
    cy.location("pathname").should("eq", "/dashboard");
  });

  it("renders the MessageList heading", () => {
    cy.contains("h1", "Dina senaste utskick").should("exist");
  });

  it("displays existing messages from the API", () => {
    cy.contains("h2", "Utskick 1").should("exist");
    cy.contains("h2", "Utskick 2").should("exist");
    cy.contains("h2", "Utskick 3").should("exist");
  });
});

describe("Dashboard - Navigation to Create", () => {
  beforeEach(() => {
    cy.intercept("POST", "**/api/**/login", {
      statusCode: 200,
      body: { success: true },
    }).as("loginRequest");

    cy.intercept("GET", "**/api/auth/me", {
      statusCode: 200,
      body: { email: "user@test.se", role: "USER" },
    }).as("meRequest");

    cy.visit("http://localhost:3000");
    cy.get('input[type="email"]').type("user@test.se");
    cy.get('input[type="password"]').type("password");
    cy.setCookie("token", FAKE_JWT);
    cy.get('button[type="submit"]').click();
    cy.wait("@loginRequest");
    cy.location("pathname").should("eq", "/dashboard");
  });

  it("navigates to the message creation page when 'Skapa nytt utskick' is clicked", () => {
    cy.contains("button", "Skapa nytt utskick").click();
    cy.location("pathname", { timeout: 15000 }).should("eq", "/dashboard/messages");
  });
});

describe("Dashboard - Message Interactivity", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/api/notifier/messages*", {
      statusCode: 200,
      fixture: "messages.json",
    }).as("messages");

    cy.intercept("POST", "**/api/**/login", {
      statusCode: 200,
      body: { success: true },
    }).as("loginRequest");

    cy.intercept("GET", "**/api/auth/me", {
      statusCode: 200,
      body: { email: "user@test.se", role: "USER" },
    }).as("meRequest");

    cy.visit("http://localhost:3000");
    cy.get('input[type="email"]').type("user@test.se");
    cy.get('input[type="password"]').type("password");
    cy.setCookie("token", FAKE_JWT);
    cy.get('button[type="submit"]').click();
    cy.wait("@loginRequest");
    cy.location("pathname").should("eq", "/dashboard");
    cy.contains("h2", "Utskick 1").should("exist");
  });

  it("navigates to the message detail view when an arrow button is clicked", () => {
    cy.contains("h2", "Utskick 1")
      .parent()
      .siblings("button")
      .click();

    cy.location("pathname").should("eq", "/dashboard/messages/1");
  });
});

describe("Dashboard - Display All Logic", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/api/notifier/messages*", {
      statusCode: 200,
      fixture: "messages.json",
    }).as("messages");

    cy.intercept("POST", "**/api/**/login", {
      statusCode: 200,
      body: { success: true },
    }).as("loginRequest");

    cy.intercept("GET", "**/api/auth/me", {
      statusCode: 200,
      body: { email: "user@test.se", role: "USER" },
    }).as("meRequest");

    cy.visit("http://localhost:3000");
    cy.get('input[type="email"]').type("user@test.se");
    cy.get('input[type="password"]').type("password");
    cy.setCookie("token", FAKE_JWT);
    cy.get('button[type="submit"]').click();
    cy.wait("@loginRequest");
    cy.location("pathname").should("eq", "/dashboard");
    cy.contains("h2", "Utskick 1").should("exist");
  });

  it("shows only 3 messages initially when more than 3 exist", () => {
    cy.get("h2.text-h3-sm").should("have.length", 3);
  });

  it("shows the 'Visa alla' button when more than 3 messages exist", () => {
    cy.contains("button", "Visa alla").should("exist");
  });

  it("displays all messages after clicking 'Visa alla'", () => {
    cy.contains("button", "Visa alla").click();
    cy.get("h2.text-h3-sm").should("have.length", 4);
    cy.contains("h2", "Utskick 4").should("exist");
  });

  it("collapses back to 3 messages after clicking 'Tillbaka'", () => {
    cy.contains("button", "Visa alla").click();
    cy.contains("button", "Tillbaka").click();
    cy.get("h2.text-h3-sm").should("have.length", 3);
    cy.contains("h2", "Utskick 4").should("not.exist");
  });
});
