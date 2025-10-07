/// <reference types="cypress" />
import { registrationForm } from "../../pom/forms/Registration";
import { homePage } from "../../pom/pages/HomePage";
let testData;

describe('Check Header navigation', () => {
    beforeEach(() => {
         cy.fixture('credentials').then((data) => {
            testData = data;
        });
        cy.visit('/');
    });
     it("Check Sign Up with valid credentials", () => {
        registrationForm.openRegistrationForm().should('be.visible');
        registrationForm.formTitle.should('be.visible').and('have.text', 'Registration');
        registrationForm.nameLabel.should('be.visible').and('have.text', 'Name');
        registrationForm.nameInput.should('be.visible').type('Test').blur();
        registrationForm.lastNameLable.should('be.visible').and('have.text', 'Last name');
        registrationForm.lastNameInput.should('be.visible').type('TestLastN').blur();
        registrationForm.emailLabel.should('be.visible').and('have.text', 'Email');
        registrationForm.emailInput.should('be.visible').type(registrationForm.RndEmail).blur();
        registrationForm.passwordLabel.should('be.visible').and('have.text', 'Password');
        registrationForm.passwordInput.should('be.visible').type('test123KO!').blur();
        registrationForm.repeatPasswordlabel.should('be.visible').and('have.text', 'Re-enter password');
        registrationForm.repeatPasswordInput.should('be.visible').type('test123KO!').blur();
        registrationForm.closeButton.should('be.visible').and('have.text', '×');
        registrationForm.registerButton.should('be.enabled').and('have.text', 'Register');
        //cy.wait(5000);
        registrationForm.registerButton.click();
        homePage.titleH1.should('have.text', 'Garage');
    });
    it.only("Check Sign Up with registered user", () => {
        registrationForm.openRegistrationForm().should('be.visible');
        registrationForm.nameInput.type('Test').blur();
        registrationForm.lastNameInput.type('TestLastN').blur();
        registrationForm.emailInput.type(testData.validCredentials.email).blur();
        registrationForm.passwordInput.type(testData.validCredentials.password).blur();
        registrationForm.repeatPasswordInput.type(testData.validCredentials.password).blur();
        registrationForm.registerButton.should('be.enabled').and('have.text', 'Register');
        registrationForm.registerButton.click();
        registrationForm.userExisitError1.should('have.text', 'User already exists');
    });
    });