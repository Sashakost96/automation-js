/// <reference types="cypress" />

import { registrationForm } from "../../pom/forms/Registration";
import { homePage } from "../../pom/pages/HomePage";
let validEmail;
let validPassword;
let invalidEmail;
let invalidPassword;

describe('Check Registration flows', () => {
    beforeEach(() => {
        const env = Cypress.env('environment') || 'dev';
        cy.fixture(`${env}_user.json`).then((data) => {
            validEmail = data.validCredentials.email;
            validPassword = data.validCredentials.password;
            invalidEmail = data.invalidCredentials.email;
            invalidPassword = data.invalidCredentials.password;
        });
        cy.visit('/');
    });
    it("Check Sign Up with valid credentials", () => {
        registrationForm.openRegistrationForm().should('be.visible');
        registrationForm.formTitle.should('be.visible').and('have.text', 'Registration');
        registrationForm.nameLabel.should('be.visible').and('have.text', 'Name');
        registrationForm.nameInput.should('be.visible').type('Test').blur();
        registrationForm.lastNameLabel.should('be.visible').and('have.text', 'Last name');
        registrationForm.lastNameInput.should('be.visible').type('TestLastN').blur();
        registrationForm.emailLabel.should('be.visible').and('have.text', 'Email');
        registrationForm.emailInput.should('be.visible').type(registrationForm.RndEmail).blur();
        registrationForm.passwordLabel.should('be.visible').and('have.text', 'Password');
        registrationForm.passwordInput.should('be.visible').type('test123KO!').blur();
        registrationForm.repeatPasswordLabel.should('be.visible').and('have.text', 'Re-enter password');
        registrationForm.repeatPasswordInput.should('be.visible').type('test123KO!').blur();
        registrationForm.closeButton.should('be.visible').and('have.text', '×');
        registrationForm.registerButton.should('be.enabled').and('have.text', 'Register');
        registrationForm.registerButton.click();
        homePage.titleH1.should('have.text', 'Garage');
    });

    it("Check Sign Up with registered user", () => {
        registrationForm.openRegistrationForm().should('be.visible');
        registrationForm.nameInput.type('Test').blur();
        registrationForm.lastNameInput.type('TestLastN').blur();
        registrationForm.emailInput.type(validEmail).blur();
        registrationForm.passwordInput.type(validPassword).blur();
        registrationForm.repeatPasswordInput.type(validPassword).blur();
        registrationForm.registerButton.should('be.enabled').and('have.text', 'Register');
        registrationForm.registerButton.click();
        registrationForm.userExistsError1.should('have.text', 'User already exists');
    });
});