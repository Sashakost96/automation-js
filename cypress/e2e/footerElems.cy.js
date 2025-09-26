describe("Check the footer elements", () => {
    beforeEach(() => {
        cy.visit("/");
    });
    it("Check copyright text", () => {
        cy.get("footer p:first-child").contains("©").should('be.visible').and('have.text', "© 2021 Hillel IT school");
    });
    it("Check site purposes text ", () => {
        cy.get("footer p:last-child").should('be.visible').and('have.text', "Hillel auto developed in Hillel IT school for educational purposes of QA courses.");
    });
    it("Check site logo", () => {
        cy.get("footer .footer_logo svg").should('be.visible');
        cy.wrap({ width: "42" }).its("width").and("eq", "42");
        cy.wrap({ height: "80" }).its("height").should("eq", "80");
    });
});