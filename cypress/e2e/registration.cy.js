/// <reference types="cypress" />

describe("Check the [Registration] form match the design", () => {

    beforeEach(() => {
        cy.visit("/");
        cy.get("button.hero-descriptor_btn.btn.btn-primary").click();
    });
    it("Check the [Register] form has all headers", () => {
        cy.get("app-signup-modal button.btn.btn-primary").should("have.text", "Register");
        cy.get(".modal-title").should("have.text", "Registration");
        cy.get("div.modal-header > button").should("have.text", "×");
        cy.get(".modal-body").find("form > div:nth-child(1) > label", "Name").should("have.text", "Name");
        cy.get(".modal-body").find("form > div:nth-child(2) > label", "Last name").should("have.text", "Last name");
        cy.get(".modal-body").find("form > div:nth-child(3) > label", "Email").should("have.text", "Email");
        cy.get(".modal-body").find("form > div:nth-child(4) > label", "Password").should("have.text", "Password");
        cy.get(".modal-body").find("form > div:nth-child(5) > label", "Re-enter password").should("have.text", "Re-enter password");
    });
    it("Check the label font size and text color match", () => {
        cy.get(".modal-title").contains("Registration").should("have.css", "font-size", "24px")
            .and("have.css", "color", "rgb(55, 58, 60)");
        cy.get(".modal-body").find("form > div:nth-child(1) > label", "Name").should("have.css", "font-size", "16px")
            .and("have.css", "color", "rgb(55, 58, 60)");
        cy.get(".modal-body").find("form > div:nth-child(2) > label", "Last name").should("have.css", "font-size", "16px")
            .and("have.css", "color", "rgb(55, 58, 60)");
        cy.get(".modal-body").find("form > div:nth-child(3) > label", "Email").should("have.css", "font-size", "16px")
            .and("have.css", "color", "rgb(55, 58, 60)");
        cy.get(".modal-body").find("form > div:nth-child(4) > label", "Password").should("have.css", "font-size", "16px")
            .and("have.css", "color", "rgb(55, 58, 60)");
        cy.get(".modal-body").find("form > div:nth-child(5) > label", "Re-enter password").should("have.css", "font-size", "16px")
            .and("have.css", "color", "rgb(55, 58, 60)");
        cy.get("app-signup-modal button.btn.btn-primary").should("have.css", "font-size", "16px")
            .and("have.css", "color", "rgb(255, 255, 255)");

    });
});

describe("Check the Name field validation", () => {
    beforeEach(() => {
        cy.visit("/");
        cy.get("button.hero-descriptor_btn.btn.btn-primary").click();
    });
    it("Check [Name] field is empty", () => {
        cy.get("#signupName").click().blur();
        cy.get(".invalid-feedback")
            .should("have.text", "Name required")
            .and("have.css", "border-color", "rgb(220, 53, 69)");
    });
    it("Check [Name] < 2 symbols", () => {

        cy.get("#signupName").type("a").blur();
        cy.get(".invalid-feedback")
            .should("have.text", "Name has to be from 2 to 20 characters long")
            .and("have.css", "border-color", "rgb(220, 53, 69)");
    });
    it("Check [Name] > 20 symbols", () => {
        cy.get("#signupName").type("aqaqaqaqaqaqaqaqaqaqW").blur();
        cy.get(".invalid-feedback")
            .should("have.text", "Name has to be from 2 to 20 characters long")
            .and("have.css", "border-color", "rgb(220, 53, 69)");
    });
    it("Check [Name] used specific symbols", () => {
        cy.get("#signupName").type("!@#$%^&**()").blur();
        cy.get(".invalid-feedback")
            .should("have.text", "Name is invalid")
            .and("have.css", "border-color", "rgb(220, 53, 69)");
    });
});

describe("Check the Last Name field validation", () => {

    beforeEach(() => {
        cy.visit("/");
        cy.get("button.hero-descriptor_btn.btn.btn-primary").click();
    });
    it("Check [Last Name] field is empty", () => {
        cy.get("#signupLastName").click().blur();
        cy.get(".invalid-feedback")
            .should("have.text", "Last name required")
            .and("have.css", "border-color", "rgb(220, 53, 69)");
    });
    it("Check [Last Name] < 2 symbols", () => {

        cy.get("#signupLastName").type("a").blur();
        cy.get(".invalid-feedback")
            .should("have.text", "Last name has to be from 2 to 20 characters long")
            .and("have.css", "border-color", "rgb(220, 53, 69)");
    });
    it("Check [Last Name] > 20 symbols", () => {
        cy.get("#signupLastName").type("aqaqaqaqaqaqaqaqaqaqW").blur();
        cy.get(".invalid-feedback")
            .should("have.text", "Last name has to be from 2 to 20 characters long")
            .and("have.css", "border-color", "rgb(220, 53, 69)");
    });
    it("Check [Last Name] used specific symbols", () => {
        cy.get("#signupLastName").type("!@#$%^&**()").blur();
        cy.get(".invalid-feedback")
            .should("have.text", "Last name is invalid")
            .and("have.css", "border-color", "rgb(220, 53, 69)");
    });
});

describe("Check the email field validation", () => {

    beforeEach(() => {
        cy.visit("/");
        cy.get("button.hero-descriptor_btn.btn.btn-primary").click();
    });
    it("Check [Email] field is empty", () => {
        cy.get("#signupEmail").click().blur();
        cy.get(".invalid-feedback")
            .should("have.text", "Email required")
            .and("have.css", "border-color", "rgb(220, 53, 69)");
    });
    it("Check [Email] field with invalid data", () => {
        cy.get("#signupEmail").type("testemail123@gmail").blur()
        cy.get(".invalid-feedback")
            .should("have.text", "Email is incorrect")
            .and("have.css", "border-color", "rgb(220, 53, 69)");

    });
});


describe("Check the password field validation", () => {

    beforeEach(() => {
        cy.visit("/");
        cy.get("button.hero-descriptor_btn.btn.btn-primary").click();
    });
    it("Check [Password] field is empty", () => {
        cy.get("#signupPassword").click().blur();
        cy.get(".invalid-feedback")
            .should("have.text", "Password required")
            .and("have.css", "border-color", "rgb(220, 53, 69)");
    });

    it("Check [Password] < 8 symbols", () => {
        cy.get("#signupPassword").type("a").blur();
        cy.get(".invalid-feedback")
            .should("have.text", "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")
            .and("have.css", "border-color", "rgb(220, 53, 69)");
    });
    it("Check [Password] > 15 symbols", () => {
        cy.get("#signupPassword").type("passwordMoreThan15symb()|s").blur();
        cy.get(".invalid-feedback")
            .should("have.text", "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")
            .and("have.css", "border-color", "rgb(220, 53, 69)");
    });
    it("Check [Password] without numbers", () => {
        cy.get("#signupPassword").type("pass_NumLess").blur();
        cy.get(".invalid-feedback")
            .should("have.text", "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")
            .and("have.css", "border-color", "rgb(220, 53, 69)");
    });
    it("Check [Password] without capital letter", () => {
        cy.get("#signupPassword").type("pass_small1").blur();
        cy.get(".invalid-feedback")
            .should("have.text", "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")
            .and("have.css", "border-color", "rgb(220, 53, 69)");
    });
    it("Check [Password] without small letter", () => {
        cy.get("#signupPassword").type("PASS!BIG1").blur();
        cy.get(".invalid-feedback")
            .should("have.text", "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")
            .and("have.css", "border-color", "rgb(220, 53, 69)");
    });
});

describe("Check the Re-enter password field validation", () => {

    beforeEach(() => {
        cy.visit("/");
        cy.get("button.hero-descriptor_btn.btn.btn-primary").click();
    });

    it("Check [Re-enter Password] field is empty", () => {
        cy.get("#signupRepeatPassword").click().blur();
        cy.get(".invalid-feedback")
            .should("have.text", "Re-enter password required")
            .and("have.css", "border-color", "rgb(220, 53, 69)");
    });

    it("Check [Re-enter Password] match data from [Password] field", () => {
        cy.get("#signupPassword").type("validPass123!")
        cy.get("#signupRepeatPassword").type('validPass123+1').blur();
        cy.get(".invalid-feedback").should("have.text", "Passwords do not match")
            .and("have.css", "border-color", "rgb(220, 53, 69)");
    });
});

it("Check the [Register] button eneble only when all fields entered valid data", () => {
    cy.visit("/");
    cy.get("button.hero-descriptor_btn.btn.btn-primary").click();
    cy.get("app-signup-modal button.btn.btn-primary").should("not.be.enabled");
    cy.get("#signupName").type("Sasha").should("have.css", "border-color", "rgb(92, 179, 253)");
    cy.get("app-signup-modal button.btn.btn-primary").should("not.be.enabled");
    cy.get("#signupLastName").type("Test").should("have.css", "border-color", "rgb(92, 179, 253)");
    cy.get("#signupEmail").type("sashatest@gmail.com").should("have.css", "border-color", "rgb(92, 179, 253)");
    cy.get("#signupPassword").type("password123KO!").should("have.css", "border-color", "rgb(92, 179, 253)");
    cy.get("#signupRepeatPassword").type("password123KO!").should("have.css", "border-color", "rgb(92, 179, 253)").blur();
    cy.get("app-signup-modal button.btn.btn-primary").should("be.enabled").and("have.css", "background-color", "rgb(2, 117, 216)");
});

it("Check entered data reset after closing the [Registration] form", () => {
    cy.visit("/");
    cy.get("button.hero-descriptor_btn.btn.btn-primary").click();
    cy.get("app-signup-modal button.btn.btn-primary")
    cy.get("#signupName").type("Sasha");
    cy.get("#signupLastName").type("Test");
    cy.get("#signupEmail").type("sashatest@gmail.com");
    cy.get("#signupPassword").type("password123KO!");
    cy.get("#signupRepeatPassword").type("password123KO!");
    cy.get("div.modal-header > button").click();
    cy.get("button.hero-descriptor_btn.btn.btn-primary").click();
    cy.get("#signupName").should("not.have.text");
    cy.get("#signupLastName").should("not.have.text");
    cy.get("#signupEmail").should("not.have.text");
    cy.get("#signupRepeatPassword").should("not.have.text");

});