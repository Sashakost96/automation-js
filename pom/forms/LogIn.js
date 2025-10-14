import HomePage, { homePage } from "../../pom/pages/HomePage";

class LogInForm {
    openSignInForm() {
        return homePage.signInButton.click();
    }

    get form() {
        return cy.get('div.modal-content');
    }

    get formTitle() {
        return this.form.contains('.modal-title', 'Log in');
    }

    get closeButton() {
        return this.form.contains('button', '×');
    }

    get labelEmail() {
        return this.form.contains('label', 'Email');
    }

    get emailInput() {
        return cy.get('#signinEmail');
    }

    get labelPassword() {
        return this.form.contains('label', 'Password');
    }

    get passwordInput() {
        return cy.get('#signinPassword');
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
        return this.form.contains('button', 'Forgot password');
    }

    get registrationButton() {
        return this.form.contains('button', 'Registration');
    }

    get loginButton() {
        return this.form.contains('button', 'Login');
    }

    get loginError1() {
        return cy.get('p.alert.alert-danger').contains('Wrong email or password');
    }

    get emailError1() {
        return cy.get('.invalid-feedback > p').contains('Email is incorrect');
    }

    get emailError2() {
        return cy.get('.invalid-feedback > p').contains('Email required');
    }

    get passwordError1() {
        return cy.get('.invalid-feedback > p').contains('Password required');
    }

}
export const loginForm = new LogInForm();