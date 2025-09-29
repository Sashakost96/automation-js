/// <reference types="cypress" />
import './commands';

beforeEach(() => {
    cy.visit("/");
});
it("Check the header  after Login as a real user", () => {
    cy.login('as@gmail.com', 'cfif123KO!');
    cy.get("h1").should("have.text", "Garage");
});

