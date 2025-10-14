import { BaseClassPages } from "./BaseClassPages";

class FuelExpensesPage extends BaseClassPages {

    get navigationExpensesButton() {
        return this.sideBar('expenses');
    }

    get pageLocator() {
        return cy.get('.global-layout ');
    }

    get addExpensesButton() {
        return this.button('btn.btn-primary');
    }

    get alertMessage() {
        return this.alert('.alert-success');
    }

    get pageTitle() {
        return this.titleH1();
    }

    get expensesTable() {
        return cy.get('.table.expenses_table');
    }

    get editExpensesButton() {
        return cy.get('table > tbody > tr:first-child > td:last-child > button.btn.btn-edit');
    }

    get deleteExpensesButton() {
        return cy.get('table > tbody > tr:first-child > td:last-child > button.btn.btn-delete');
    }

}

export const fuelExpensesP = new FuelExpensesPage()