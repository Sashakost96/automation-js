/// <reference types="cypress" />

describe("Check the header elements", () => {
    beforeEach(() => {
        cy.visit("/");
    });
    it("Check site logo", () => {
        cy.get("header .header_logo svg").should('be.visible');
        cy.wrap({ width: "135" }).its("width").should("eq", "135");
        cy.wrap({ height: "30" }).its("height").should("eq", "30");
    });
    it("Check the navbar elements", () => {
        cy.get("header").contains("Home").should('be.visible').and('have.text', "Home")
        cy.get("header").contains("About").should('be.visible').and('have.text', "About")
        cy.get("header").contains("Contacts").should('be.visible').and('have.text', "Contacts")
    });
    it("Check the right side header elements", () => {
        cy.get("header").contains("Guest log in").should('be.visible').and('have.text', "Guest log in")
        cy.get("header").contains("Sign In").should('be.visible').and('have.text', "Sign In")
    });
});

