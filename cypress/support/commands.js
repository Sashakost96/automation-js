import { loginForm } from "../../pom/forms/LogIn";
import { carForm } from "../../pom/forms/CarForm";
import { garagePage } from "../../pom/pages/GaragePage";
import { fuelExpensesF } from "../../pom/forms/fuelExpensesForm";
import { fuelExpensesP } from "../../pom/pages/FuelExpensesPage";

function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}

Cypress.Commands.add('addCar', () => {
  garagePage.addCarButton.click();
  carForm.brandSelect.select(getRandomInt(4));
  carForm.modelSelect.select(getRandomInt(2));
  carForm.mileageInput.type(getRandomInt(999));
  carForm.addButton.click();
});

Cypress.Commands.add('deleteCar', () => {
  garagePage.navigationToGarageButton.click();
  garagePage.edit1CarButton.click();
  carForm.removeButton.click();
  carForm.removeConfirmationButton.click();
});

Cypress.Commands.add('addExpenses', () => {
  fuelExpensesP.addExpensesButton.click();
  fuelExpensesF.mileageInput.type('10');
  fuelExpensesF.numberOfLitersInput.type('30');
  fuelExpensesF.totalCostInput.type('1000');
  fuelExpensesF.addButton.click();
});

Cypress.Commands.add('logIn', () => {
  const env = Cypress.env('environment') || 'dev'; 
  const fixtureName = `${env}_user.json`;
  cy.fixture(fixtureName).then((user) => {
    loginForm.openSignInForm();
    loginForm.emailInput.type(user.validCredentials.email).blur();
    loginForm.passwordInput.type(user.validCredentials.password).blur();
    loginForm.loginButton.click();
  });
});