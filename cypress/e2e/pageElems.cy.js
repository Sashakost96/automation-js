describe("Check the section - hero", () => {
    beforeEach(() => {
        cy.visit("/");
    });
    it("Check the hero header", () => {
        cy.get("h1").contains("Do more!").should('be.visible').and('have.text', "Do more!");
    });
    it("Check the hero description", () => {
        cy.get("section > div .hero-descriptor > p").should('be.visible').and('have.text',
            "With the help of the Hillel auto project, you will have the opportunity to get hands-on experience in manual testing."
        );
    });
    it("Check the Sign up button", () => {
        cy.get("section > div .hero-descriptor > button").contains("Sign up").should('be.visible').and('have.text', "Sign up");
    });
});

describe("Check the section - about", () => {
    beforeEach(() => {
        cy.visit("/");
    });
    it("Check the h2 text", () => {
        cy.get("#aboutSection p").contains("Log fuel expenses").should('be.visible').and('have.text', "Log fuel expenses");
        cy.get("#aboutSection p").contains("Instructions and manuals").should('be.visible').and('have.text', "Instructions and manuals");
    });
    it("Check the h2 description text", () => {
        cy.get("#aboutSection").contains('Keep track').should('be.visible').and('have.text',
            "Keep track of your replacement schedule and plan your vehicle maintenance expenses in advance."
        );
        cy.get("#aboutSection p").contains('Watch over').should('be.visible').and('have.text',
            "Watch over 100 instructions and repair your car yourself."
        );
    });
});