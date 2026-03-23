// Valid fake JWT with payload {"email":"user@test.se","role":"USER"}
const FAKE_JWT =
  "eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InVzZXJAdGVzdC5zZSIsInJvbGUiOiJVU0VSIn0.fakesignature";

beforeEach(() => {
  cy.intercept("GET", "**/api/**", {
    statusCode: 200,
    body: [],
  }).as("backgroundApi");
});

describe("Login Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("renders the login form", () => {
    cy.contains("Välkommen").should("exist");
    cy.get('input[type="email"]').should("exist");
    cy.get('input[type="password"]').should("exist");
    cy.get('button[type="submit"]').should("exist");
  });

  it("shows error on invalid credentials", () => {
    cy.intercept("POST", "**/api/**/login", {
      statusCode: 401,
      body: "User not found.",
    }).as("loginRequest");

    cy.get('input[type="email"]').type("wrong@example.com");
    cy.get('input[type="password"]').type("wrongpass");
    cy.get('button[type="submit"]').click();

    cy.wait("@loginRequest");
    cy.contains("Inloggningen misslyckades").should("exist");
  });

  it("logs in successfully and redirects", () => {
    cy.intercept("POST", "**/api/**/login", {
      statusCode: 200,
      body: { success: true },
    }).as("loginRequest");

    cy.intercept("GET", "**/api/auth/me", {
      statusCode: 200,
      body: { email: "user@test.se", role: "USER" },
    }).as("meRequest");

    cy.get('input[type="email"]').type("user@test.se");
    cy.get('input[type="password"]').type("password");

    cy.setCookie("token", FAKE_JWT);

    cy.get('button[type="submit"]').click();

    cy.wait("@loginRequest");
    cy.location("pathname").should("eq", "/dashboard");
  });
});

describe("Sign Out", () => {
  beforeEach(() => {
    cy.intercept("POST", "**/api/**/logout", {
      statusCode: 200,
      body: { success: true },
    }).as("logoutRequest");

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

  it("renders dashboard while signed in", () => {
    cy.contains("Skapa nytt utskick").should("exist");
  });

  it("signs out successfully", () => {
    cy.contains("button", /Logga ut/i).click({ force: true });

    cy.wait("@logoutRequest");
    cy.clearCookie("token");

    cy.reload();
    cy.location("pathname", { timeout: 15000 }).should("eq", "/");
  });
});
