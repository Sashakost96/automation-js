/// <reference types="cypress" />

import { loginForm } from "../../pom/forms/LogIn";
import { garagePage } from "../../pom/pages/GaragePage";

let validEmail;
let validPassword;
let invalidEmail;
let invalidPassword;

describe("Check Sign In logic", () => {
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

    it("Check Sign In UI", () => {
        loginForm.openSignInForm().should('be.visible');
        loginForm.formTitle.should('be.visible').and('have.text', 'Log in');
        loginForm.labelEmail.should('be.visible').and('have.text', 'Email');
        loginForm.labelPassword.should('be.visible').and('have.text', 'Password');
        loginForm.rememberMeLabel.should('be.visible').and('have.text', ' Remember me ');
        loginForm.rememberMeCheck.should('be.visible');
        loginForm.forgotPassword.should('be.visible').and('have.text', 'Forgot password');
        loginForm.registrationButton.should('be.visible').and('have.text', 'Registration');
        loginForm.closeButton.should('be.visible').and('have.text', '×');
        loginForm.loginButton.should('not.be.enabled').and('have.text', 'Login');
    });

    it("Check Sign In with valid credentials", () => {
        loginForm.openSignInForm().should('be.visible');
        loginForm.emailInput.type(validEmail).blur();
        loginForm.passwordInput.type(validPassword).blur();
        loginForm.rememberMeCheck.should('be.visible').check();
        loginForm.loginButton.click();
        garagePage.alertMessage.should('have.text', 'You have been successfully logged in');
        garagePage.pageTitle.should('have.text', 'Garage');
    });

    it("Check Sign In with invalid credentials", () => {
        loginForm.openSignInForm();
        loginForm.emailInput.type(invalidEmail).blur();
        loginForm.passwordInput.type(invalidPassword).blur();
        loginForm.loginButton.click();
        loginForm.loginError1.should('have.text', 'Wrong email or password');
        loginForm.loginButton.should('not.be.disabled');

    });

    it("Check Sign In with invalid format of email", () => {
        loginForm.openSignInForm();
        loginForm.emailInput.type('@gmail.com ').blur();
        loginForm.passwordInput.type(validPassword).blur();
        loginForm.emailError1.should('have.text', 'Email is incorrect');
        loginForm.loginButton.should('be.disabled');
    });

    it("Check Sign In without email", () => {
        loginForm.openSignInForm();
        loginForm.emailInput.click().blur();
        loginForm.passwordInput.type(validPassword).blur();
        loginForm.emailError2.should('have.text', 'Email required');
        loginForm.loginButton.should('be.disabled');
    });

    it("Check Sign In without password", () => {
        loginForm.openSignInForm();
        loginForm.emailInput.type(validEmail).blur();
        loginForm.passwordInput.click().blur();
        loginForm.passwordError1.should('have.text', 'Password required');
        loginForm.loginButton.should('be.disabled');
    });

    it("Check closing form functionality", () => {
        loginForm.openSignInForm();
        loginForm.closeButton.click();
        loginForm.getForm.should('not.be.visible');
    });
});
