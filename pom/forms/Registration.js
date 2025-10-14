import { homePage } from "../../pom/pages/HomePage";
import { BaseClassForms } from "./BaseClassForms";

class RegistrationForm extends BaseClassForms{

    openRegistrationForm() {
        return homePage.signUpButton.click();
    }

    get getForm() {
        return cy.get('div.modal-content');
    }

    get formTitle() {
        return this.title();
    }

    get closeButton() {
        return this.button('close');
    }

    get registerButton() {
        return this.button('btn.btn-primary');
    }

    get nameLabel() {
        return this.label('signupName');
    }

    get nameInput() {
        return this.inputField('signupName');
    }

    get lastNameLabel() {
        return this.label('signupLastName');
    }

    get lastNameInput() {
        return this.inputField('signupLastName');
    }

    get emailLabel() {
        return this.label('signupEmail');
    }

    get emailInput() {
        return this.inputField('signupEmail');
    }

    get passwordLabel() {
        return this.label('signupPassword');
    }

    get passwordInput() {
        return this.inputField('signupPassword');
    }

    get repeatPasswordLabel() {
        return this.label('signupRepeatPassword');
    }

    get repeatPasswordInput() {
        return this.inputField('signupRepeatPassword');
    }

    get RndEmail() {
        return `test+${Date.now().toString().slice(-4)}@example.com`;
    }

    get userExistsError1() {
        return this.errorAlert('p.alert.alert-danger').contains('User already exists');
    }
}

export const registrationForm = new RegistrationForm();