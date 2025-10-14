import HomePage, { homePage } from "../../pom/pages/HomePage";

class RegistrationForm {

    openRegistrationForm() {
        return homePage.signUpButton.click();
    }

    get form() {
        return cy.get('div.modal-content');
    }

    get formTitle() {
        return this.form.find('.modal-title');
    }

    get closeButton() {
        return this.form.contains('button', '×');
    }

    get registerButton() {
        return this.form.contains('button', 'Register');
    }

    get nameLabel() {
        return this.form.contains('label', 'Name');
    }

    get nameInput() {
        return cy.get('#signupName');
    }

    get lastNameLabel() {
        return this.form.contains('label', 'Last name');
    }

    get lastNameInput() {
        return cy.get('#signupLastName');
    }

    get emailLabel() {
        return this.form.contains('label', 'Email');
    }

    get emailInput() {
        return cy.get('#signupEmail');
    }

    get passwordLabel() {
        return this.form.contains('label', 'Password');
    }

    get passwordInput() {
        return cy.get('#signupPassword');
    }

    get repeatPasswordLabel() {
        return this.form.contains('label', 'Re-enter password');
    }

    get repeatPasswordInput() {
        return cy.get('#signupRepeatPassword');
    }

    get RndEmail() {
        return `test+${Date.now().toString().slice(-4)}@example.com`
    }

    get userExistsError1() {
        return cy.get('.alert').contains('User already exists');
    }
}

export const registrationForm = new RegistrationForm();