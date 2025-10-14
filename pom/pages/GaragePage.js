
import { BaseClassPages } from "../../pom/pages/BaseClassPages";

class GaragePage extends BaseClassPages {

    get pageLocator() {
        return cy.get('.global-layout ');
    }

    get navigationToGarageButton() {
        return this.sideBar('garage');
    }

    get addCarButton() {
        return this.button('btn.btn-primary');
    }

    get alertMessage() {
        return this.alert('.alert-success');
    }

    get pageTitle() {
        return this.titleH1();
    }

    get edit1CarButton() {
        return cy.get('ul > li:nth-child(1) button.car_edit.btn.btn-edit');
    }
}

export const garagePage = new GaragePage();