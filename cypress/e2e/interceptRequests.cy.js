/// <reference types="cypress" />
import { fuelExpensesP } from "../../pom/pages/FuelExpensesPage";

describe('Intercept tests', () => {

    beforeEach(() => {
        cy.visit('/');
        cy.logIn();
    })

    it('Mock /profile to get fake name', () => {
        const fakeUser = {
            "status": "ok",
            "data": {
                "userId": 265726,
                "photoFilename": "default-user.png",
                "name": "Kotik",
                "lastName": "Kompotik"
            }
        }
        cy.intercept('GET', 'https://qauto.forstudy.space/api/users/profile', {
            statusCode: 200,
            body: fakeUser
        }).as('userBody');
   
        cy.get('#userNavDropdown').click();
        cy.get('.dropdown-item.btn.btn-link.user-nav_link').contains('Profile').click();
        cy.get('.profile_name').should('have.text', 'Kotik Kompotik');

        cy.wait('@userBody').then((responseData) => {
            expect(responseData.response.statusCode).to.eq(200);
            expect(responseData.response.body.data.name).to.eq('Kotik');
            expect(responseData.response.body.data.lastName).to.eq('Kompotik');
        });
    });

    let carData;
    it('Creating a car with response interception', function () {
        cy.intercept('POST', '**/cars').as('addCar');
        cy.addCar();

        cy.wait('@addCar').then((responseData) => {
            const car = responseData.response.body.data;
            expect(responseData.response.statusCode).to.eq(201);
            expect(car).to.exist;
            expect(car).to.have.property('id');
            expect(car.id).to.be.a('number');
            carData = {
                'id': car.id,
                'carBrandId': car.carBrandId,
                'carModelId': car.carModelId,
                'initialMileage': car.initialMileage,
                'updatedMileageAt': car.updatedMileageAt,
                'carCreatedAt': car.carCreatedAt,
                'mileage': car.mileage,
                'brand': car.brand,
                'model': car.model,
                'logo': car.logo,
            }
        });
    });


    it('Add expenses for created car and checking it present in the Expanses table', function () {
        cy.intercept('POST', '/api/expenses').as('addExpanse');
        cy.log(`carID = ${JSON.stringify(carData.id)}`);

        const newMileage = carData.initialMileage + 1;
        const reportedAt = new Date().toISOString();
        function getRandomInt(max) {
            return Math.floor(Math.random() * max)
        }
        const liters = getRandomInt(90);
        const totalCost = getRandomInt(10);

        const expenseData = {
            'carId': carData.id,
            'reportedAt': reportedAt,
            'mileage': newMileage,
            'liters': liters,
            'totalCost': totalCost
        }
        fuelExpensesP.navigationExpensesButton.click();
        cy.addExpenses(expenseData);

        cy.wait('@addExpanse').then((responseData) => {
            let res = responseData.response.body.data;
            expect(responseData.response.statusCode).to.eq(200);
            expect(res).to.exist;
            cy.log(JSON.stringify(res));
            expect(res.id).to.be.a('number', 'Check type of expense ID');
            expect(res.carId).to.eq(carData.id, 'Check car ID match');
            expect(res.mileage).gt(carData.initialMileage, 'Check Mileage value increased')
            .and.eq(expenseData.mileage, 'Validating Mileage value');
             expect(res.liters).to.be.a('number', 'Check type of Liters value')
                 .and.eq(expenseData.liters, 'Validating Liters value');
             expect(res.totalCost).to.be.a('number', 'Check type of Total Cost value')
                 .and.eq(expenseData.totalCost, 'Validating Liters value Total Cost value');
        });
    });
});