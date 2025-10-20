import { BaseClassForms } from "./BaseClassForms"

class FuelExpenses extends BaseClassForms {

    get getForm() {
        return cy.get('div.modal-content ')
    }

    get formTitle() {
        return this.title(); //.modal-title
    }

    get vehicleLabel() {
        return this.label('addExpenseCar');
    }

    get vehicleSelect() {
        return this.inputField('addExpenseCar');
    }

    get reportDate() {
        return this.inputField('addExpenseDate');
    }

    get reportDateLabel() {
        return this.label('addExpenseDate');
    }

    get mileageLabel() {
        return this.label('addExpenseMileage');
    }

    get mileageInput() {
        return this.inputField('addExpenseMileage');
    }

    get numberOfLitersLabel() {
        return this.label('addExpenseLiters');
    }

    get numberOfLitersInput() {
        return this.inputField('addExpenseLiters');
    }

    get totalCostLabel() {
        return this.label('addExpenseTotalCost');
    }

    get totalCostInput() {
        return this.inputField('addExpenseTotalCost');
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
        return this.errorMessageInput();
    }

    get formAlert() {
        return this.errorAlert('p.alert.alert-danger');
    }

    get removeEntryButton() {
        return this.button('btn.btn-danger');
    }
}

export const fuelExpensesF = new FuelExpenses();