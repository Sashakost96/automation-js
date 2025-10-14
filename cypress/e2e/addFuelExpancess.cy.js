/// <reference types="cypress" />

import { fuelExpensesF } from "../../pom/forms/fuelExpensesForm";
import { fuelExpensesP } from "../../pom/pages/FuelExpensesPage";


describe("Check Add Fuel page", () => {
    beforeEach(() => {  
        cy.visit('/');
        cy.logIn();
        cy.addCar();
        fuelExpensesP.navigationExpensesButton.click();
    });

    afterEach(() => {
        cy.deleteCar();
        fuelExpensesP.alertMessage.should('be.visible').and('contains.text', 'Car removed');
    });

    it("Check `Add an expense` form UI", () => {
        fuelExpensesP.pageTitle.should('have.text', 'Fuel expenses');
        fuelExpensesP.addExpensesButton.should('have.text', 'Add an expense').click();
        fuelExpensesF.getForm.should('be.visible');
        fuelExpensesF.formTitle.should('have.text', 'Add an expense').and('have.css', 'font-size', '24px');
        fuelExpensesF.vehicleLabel.should('have.text', 'Vehicle');
        fuelExpensesF.reportDateLabel.should('have.text', 'Report date');
        fuelExpensesF.mileageLabel.should('have.text', 'Mileage');
        fuelExpensesF.numberOfLitersLabel.should('have.text', 'Number of liters');
        fuelExpensesF.totalCostLabel.should('have.text', 'Total cost');
        fuelExpensesF.cancelButton.should('be.enabled').and('have.css', 'background-color', 'rgb(255, 255, 255)');
        fuelExpensesF.addButton.should('not.be.enabled').and('have.css', 'background-color', 'rgb(2, 117, 216)');
        fuelExpensesF.closeButton.should('be.enabled').click();
    });

    it("Check 'Add an expense' logic", () => {
        fuelExpensesP.addExpensesButton.click();
        fuelExpensesF.mileageInput.type('10');
        fuelExpensesF.numberOfLitersInput.type('30');
        fuelExpensesF.totalCostInput.type('1000');
        fuelExpensesF.addButton.click();
        fuelExpensesP.alertMessage.should('be.visible').and('contains.text', 'Fuel expense added');
        fuelExpensesP.expensesTable.should('be.visible');
    });

    it("Check 'Edit an expense' logic", () => {
        cy.addExpenses();
        fuelExpensesP.alertMessage.should('be.visible').and('contains.text', 'Fuel expense added');
        fuelExpensesP.expensesTable.should('be.visible');
        fuelExpensesP.editExpensesButton.invoke('css', 'visibility', 'visible').click();
        fuelExpensesF.mileageInput.invoke('val')
            .then((currentMileage) => {
                let mileage = parseInt(currentMileage);
                const newMileage = mileage + 1;
                fuelExpensesF.mileageInput.clear().type(newMileage);
            });
        fuelExpensesF.addButton.click();
        fuelExpensesP.alertMessage.should('be.visible').and('contains.text', 'Fuel expense edited');
    });

    it("Check 'Delete an expense' logic", () => {
        cy.addExpenses();
        fuelExpensesP.expensesTable.should('be.visible');
        fuelExpensesP.deleteExpensesButton.invoke('css', 'visibility', 'visible').click();
        fuelExpensesF.removeEntryButton.click();
        fuelExpensesP.alertMessage.should('be.visible').and('contains.text', 'Fuel expense entry removed');
    });
});
