import { homePage } from "../../pom/pages/HomePage";
import { BaseClassForms } from "./BaseClassForms";

class LogInForm extends BaseClassForms {

    openSignInForm() {
        return homePage.signInButton.click();
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

    get labelEmail() {
        return this.label('signinEmail');
    }

    get emailInput() {
        return this.inputField('signinEmail');
    }

    get labelPassword() {
        return this.label('signinPassword');
    }

    get passwordInput() {
        return this.inputField('signinPassword');
    }

    get rememberMe() {
        return cy.get('.form-check');
    }

    get rememberMeLabel() {
        return this.rememberMe.find('label');
    }

    get rememberMeCheck() {
        return this.rememberMe.find('input');
    }

    get forgotPassword() {
        return this.button('btn.btn-link:last-child');
    }

    get registrationButton() {
        return this.button('btn.btn-link:first-child');
    }

    get loginButton() {
        return this.button('btn.btn-primary');
    }

    get loginError1() {
        return this.errorAlert('p.alert.alert-danger').contains('Wrong email or password');
    }

    get emailError1() {
        return this.errorAlert('.invalid-feedback > p').contains('Email is incorrect');
    }

    get emailError2() {
        return this.errorAlert('.invalid-feedback > p').contains('Email required');
    }

    get passwordError1() {
        return this.errorAlert('.invalid-feedback > p').contains('Password required');
    }

}
export const loginForm = new LogInForm();