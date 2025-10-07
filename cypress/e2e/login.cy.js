/// <reference types="cypress" />

import { loginForm } from "../../pom/forms/LogIn";
import HomePage, { homePage } from "../../pom/pages/HomePage";
let testData;

describe("Check Sign In logic", () => {
    beforeEach(() => {
        cy.fixture('credentials').then((data) => {
            testData = data;
        });
        cy.visit("/");
    });
    it("Check Sign In with valid credentials", () => {
        loginForm.openSignInForm().should('be.visible');
        loginForm.formTitle.should('be.visible').and('have.text', 'Log in');
        loginForm.labelEmail.should('be.visible').and('have.text', 'Email');
        loginForm.emailInput.should('be.visible').type(testData.validCredentials.email).blur();
        loginForm.labelPassword.should('be.visible').and('have.text', 'Password');
        loginForm.passwordInput.should('be.visible').type(testData.validCredentials.password).blur();
        loginForm.rememberMeLabel.should('be.visible').and('have.text', ' Remember me ');
        loginForm.rememberMeCheck.should('be.visible').check();
        loginForm.frorgotPassword.should('be.visible').and('have.text', 'Forgot password');
        loginForm.registrationButton.should('be.visible').and('have.text', 'Registration');
        loginForm.closeButton.should('be.visible').and('have.text', '×');
        loginForm.loginButton.should('be.enabled').and('have.text', 'Login');
        loginForm.loginButton.click();
        cy.wait(3000);
        homePage.titleH1.should('have.text', 'Garage');
    });

    it("Check Sign In with invalid credentials", () => {
        loginForm.openSignInForm();
        loginForm.emailInput.type(testData.invalidCredentials.email).blur();
        loginForm.passwordInput.type(testData.invalidCredentials.password).blur();
        loginForm.loginButton.click();
        loginForm.loginError1.should('have.text', 'Wrong email or password');
        loginForm.loginButton.should('not.be.disabled');

    })
    it("Check Sign In with invalid format of email", () => {
        loginForm.openSignInForm();
        loginForm.emailInput.type('@gmail.com ').blur();
        loginForm.passwordInput.type(testData.validCredentials.password).blur();
        loginForm.emailError1.should('have.text', 'Email is incorrect');
        loginForm.loginButton.should('be.disabled');
    })
     it("Check Sign In without email", () => {
        loginForm.openSignInForm();
        loginForm.emailInput.click().blur();
        loginForm.passwordInput.type(testData.validCredentials.password).blur();
        loginForm.emailError2.should('have.text', 'Email required');
        loginForm.loginButton.should('be.disabled');
    })

    it("Check Sign In without password", () => {
        loginForm.openSignInForm();
        loginForm.emailInput.type(testData.validCredentials.email).blur();
        loginForm.passwordInput.click().blur();
        loginForm.passwordError1.should('have.text', 'Password required');
        loginForm.loginButton.should('be.disabled');
    })

    it("Check closing form functionality", () => {
        loginForm.openSignInForm();
        loginForm.closeButton.click();
        loginForm.form.should('not.be.visible');
    })
});
