/// <reference types="cypress" />

import { garagePage } from "../../pom/pages/GaragePage";
import { carForm } from "../../pom/forms/CarForm";

describe("Check Add Car form", () => {
    beforeEach(() => {
        cy.visit('/');
        cy.logIn();
        garagePage.addCarButton.click();
    });

    it("Check Add Car form UI", () => {
        carForm.getForm.should('be.visible');
        carForm.formTitle.should('be.visible').and('have.text', 'Add a car');
        carForm.brandLabel.should('have.text', 'Brand');
        carForm.brandSelect.should('be.visible').and('contain.text', 'Audi');
        carForm.modelLabel.should('be.visible').and('have.text', 'Model');
        carForm.modelSelect.should('be.visible').and('contain.text', 'TT');
        carForm.mileageLabel.should('be.visible').and('have.text', 'Mileage');
        carForm.mileageInput.should('not.have.text');
        carForm.closeButton.should('be.enabled');
        carForm.cancelButton.should('be.enabled').and('have.css', 'background-color', 'rgb(255, 255, 255)');
        carForm.addButton.should('not.be.enabled').and('have.css', 'background-color', 'rgb(2, 117, 216)');

    });

    it("Check adding Car with valid data", () => {
        carForm.brandSelect.select('Porsche').should('have.value', '3: 4');
        carForm.modelSelect.select('Panamera').should('have.value', '7: 18');
        carForm.mileageInput.type('40');
        carForm.addButton.should('be.enabled').click();
        garagePage.alertMessage.contains('Car added').should('have.text', 'Car added');
        cy.deleteCar();

    });

    it("Check the Brands dropdown options are valid and selectable", () => {
        const expectedBrands = [
            { brand: 'Audi', value: '0: 1' },
            { brand: 'BMW', value: '1: 2' },
            { brand: 'Ford', value: '2: 3' },
            { brand: 'Porsche', value: '3: 4' },
            { brand: 'Fiat', value: '4: 5' }
        ];
        carForm.brandSelect.find('option')
            .each(($option, index) => {
                const option = expectedBrands[index];
                const actualValue = $option.attr('value');
                const actualBrand = $option.text();
                expect(actualValue).to.equal(option.value);
                expect(actualBrand).to.equal(option.brand);
                carForm.brandSelect.select(actualBrand).should('contain.text', option.brand);
            });
    });

    it("Check adding car with empty Mileage", () => {
        carForm.brandSelect.select('Porsche').should('have.value', '3: 4');
        carForm.modelSelect.select('Panamera').should('have.value', '7: 18');
        carForm.mileageInput.click().blur();
        carForm.inputError.should('have.text', 'Mileage cost required');
        carForm.addButton.should('not.be.enabled');

    });

    it("Check adding car with invalid Mileage", () => {
        carForm.brandSelect.select('Porsche').should('have.value', '3: 4');
        carForm.modelSelect.select('Panamera').should('have.value', '7: 18');
        carForm.mileageInput.type('e-').blur();
        carForm.inputError.should('have.text', 'Mileage cost required');
        carForm.addButton.should('not.be.enabled');
    });

    it("Check adding car with Mileage < 0", () => {
        carForm.brandSelect.select('Porsche').should('have.value', '3: 4');
        carForm.modelSelect.select('Panamera').should('have.value', '7: 18');
        carForm.mileageInput.type('-1').blur();
        carForm.inputError.should('have.text', 'Mileage has to be from 0 to 999999');
        carForm.addButton.should('not.be.enabled');
    });

    it("Check adding car with Mileage > 999999", () => {
        carForm.brandSelect.select('Porsche').should('have.value', '3: 4');
        carForm.modelSelect.select('Panamera').should('have.value', '7: 18');
        carForm.mileageInput.type('9999990').blur();
        carForm.inputError.should('have.text', 'Mileage has to be from 0 to 999999');
        carForm.addButton.should('not.be.enabled');
    });

    it("Check validation 'Not authenticated' for adding car", () => {
        cy.clearCookie('sid');
        carForm.brandSelect.select('BMW').should('have.value', '1: 2');
        carForm.modelSelect.select('X6').should('have.value', '8: 9');
        carForm.mileageInput.type('999999');
        carForm.addButton.click();
        carForm.formAlert.should('have.text', 'Not authenticated');
    });
});

