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
    cy.intercept("POST", "/api/login", {
      statusCode: 401,
      body: "Incorrect password",
    }).as("loginRequest");

    cy.get('input[type="email"]').type("wrong@example.com");
    cy.get('input[type="password"]').type("wrongpass");
    cy.get('button[type="submit"]').click();

    cy.wait("@loginRequest");

    cy.contains("Inloggningen misslyckades").should("exist");
  });

  it("logs in successfully and redirects", () => {
    cy.intercept("POST", "/api/login", {
      statusCode: 200,
      body: { token: "logged-in" },
      headers: {
        "set-cookie": "token=logged-in; Path=/; HttpOnly",
      },
    }).as("loginRequest");

    cy.get('input[type="email"]').type("test@example.com");
    cy.get('input[type="password"]').type("password");
    cy.get('button[type="submit"]').click();

    cy.wait("@loginRequest");
    cy.location("pathname").should("eq", "/dashboard");
  });
});

describe("Sign Out", () => {
  beforeEach(() => {
    cy.intercept("POST", "/api/logout", {
      statusCode: 200,
      body: { success: true },
      headers: {
        "set-cookie": "token=; Path=/; HttpOnly",
      },
    }).as("logoutRequest");

    cy.intercept("POST", "/api/login", {
      statusCode: 200,
      body: { token: "logged-in" },
      headers: {
        "set-cookie": "token=logged-in; Path=/; HttpOnly",
      },
    }).as("loginRequest");

    cy.visit("http://localhost:3000");

    cy.get('input[type="email"]').type("test@example.com");
    cy.get('input[type="password"]').type("password");
    cy.get('button[type="submit"]').click();

    cy.wait("@loginRequest");
    cy.location("pathname").should("eq", "/dashboard");
  });

  it("renders dashboard while signed in", () => {
    cy.contains("Dashboard").should("exist");
    cy.contains("Rendera saker här!").should("exist");
  });

  it("signs out successfully", () => {
    cy.contains("button", "Logga ut").click();
    cy.wait("@logoutRequest");
    cy.location("pathname").should("eq", "/");
  });
});
