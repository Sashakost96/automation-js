import { BaseClassForms } from "./BaseClassForms"

class CarForm extends BaseClassForms {

    get getForm() {
        return cy.get('div.modal-content ')
    }

    get formTitle() {
        return this.title();
    }

    get brandLabel() {
        return this.label('addCarBrand');
    }

    get brandSelect() {
        return this.inputField('addCarBrand');
    }

    get modelLabel() {
        return this.label('addCarModel');
    }

    get modelSelect() {
        return this.inputField('addCarModel');
    }

    get mileageLabel() {
        return this.label('addCarMileage');
    }

    get mileageInput() {
        return this.inputField('addCarMileage');
    }

    get closeButton() {
        return this.button('close')
    }

    get cancelButton() {
        return this.button('btn.btn-secondary')
    }

    get addButton() {
        return this.button('btn.btn-primary')
    }

    get inputError() {
        return this.errorMessageInput('div .invalid-feedback p');
    }

    get formAlert() {
        return this.errorAlert('p.alert.alert-danger');
    }

    //for Edit car form
    get removeButton() {
        return this.button('btn.btn-outline-danger')
    }

    //for Remove car form
    get removeConfirmationButton() {
        return this.button('btn.btn-danger');
    }
}

export const carForm = new CarForm();