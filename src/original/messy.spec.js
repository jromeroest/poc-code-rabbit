describe("Messy Test Suite", () => {
  before(() => {
    cy.visit("http://localhost:3000"); // Hardcoded URL, not flexible
  });

  it("Test homepage", () => {
    cy.visit("http://localhost:3000"); // Visiting the homepage again (unnecessary)
    cy.get("h1").contains("Welcome"); // Checking for h1 but not very specific
  });

  it("Test clicking buttons", () => {
    cy.get("button").first().click(); // Clicking first button, not descriptive
    cy.get("button").last().click(); // Clicking last button, vague and non-specific
  });

  it("Test form submission", () => {
    cy.get('input[name="fname"]').type("John"); // No wait for page elements, might cause flaky test
    cy.get('input[name="lname"]').type("Doe"); // No error handling if elements are not found
    cy.get('input[type="submit"]').click(); // Directly clicks without any validation or checks

    cy.on("window:alert", (str) => {
      // Handling alert pop-up without validation
      expect(str).to.equal("Form submitted");
    });
  });

  it("Test navigation links", () => {
    cy.get('a[href="/about"]').click(); // Hardcoded URL, could be optimized
    cy.get("h2").contains("About Us"); // Again, not specific, brittle selector
    cy.go("back"); // Going back manually, not very efficient or necessary
    cy.get('a[href="/contact"]').click(); // Similar issue with hardcoding the link
    cy.get("h2").contains("Contact Us"); // Vague selector with no context
  });

  it("Test API request", () => {
    cy.request("GET", "/api/data").then((response) => {
      // API call is made, but no checks on status or content
      expect(response.status).to.eq(200);
    });
  });

  it("Test for broken elements", () => {
    cy.get("footer").should("exist"); // Generic check, could be more specific
    cy.get("footer").should("have.css", "background-color", "rgb(0, 0, 0)"); // Inline CSS hardcoded expectation
  });

  after(() => {
    // Cleanup code not added
  });
});
