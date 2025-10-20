
/// <reference types="cypress" />
//default API tests

beforeEach(function () {

    cy.logInApi();
    cy.getCookie('sid').should('exist')
        .then((cookie) => {
            cy.wrap(cookie.value).as('sessionId');
            cy.log(`cookie: ${cookie.value}`);
            //sid=s%3AcjPi0OnnLzE8N7ItbXjPSJvG-L_u7voR.2f3HEy0UNjGW2PnzmgHvjsVhI2JpOYN8mTr3KnYQzCo    
        });
});


it('Gets car brands [GET /cars/brands]', function () {
    const sessionCookieValue = `sid=${this.sessionId}`;
    const carBrands = [
        { id: 1, title: "Audi", logoFilename: "audi.png" },
        { id: 2, title: "BMW", logoFilename: "bmw.png" },
        { id: 3, title: "Ford", logoFilename: "ford.png" },
        { id: 4, title: "Porsche", logoFilename: "porsche.png" },
        { id: 5, title: "Fiat", logoFilename: "fiat.png" }
    ];

    cy.request({
        method: 'GET',
        url: `https://qauto.forstudy.space/api/cars/brands`,
        headers: {
            Cookie: sessionCookieValue,
        },
    }).then((brandsResponse) => {
        if (brandsResponse.status !== 200) {
            expect(brandsResponse.body).to.have.property('message');
            cy.log(`Error API: ${brandsResponse.body.message}`);
            return;
        }
        const brandsArray = brandsResponse.body;
        expect(brandsResponse.status).to.eq(200, 'Check the response status code valid');
        expect(brandsArray.status).to.eq('ok', 'Check the status text is valid');
        expect(brandsArray).to.have.property('data');
        expect(brandsArray.data.length).to.eq(carBrands.length, 'Check the response body length');

        carBrands.forEach((brand, i) => {
            expect(brand.id).to.be.a('number').and.to.be.eq(brandsArray.data[i].id);
            expect(brand.title).to.be.a('string').and.to.be.eq(brandsArray.data[i].title);
            expect(brand.logoFilename).to.be.a('string').and.to.be.eq(brandsArray.data[i].logoFilename);
        });
    });
});

it('Gets car models [GET /cars/models]', function () {
    const sessionCookieValue = `sid=${this.sessionId}`;
    const carModels = [
        { "id": 1, "carBrandId": 1, "title": "TT" },
        { "id": 2, "carBrandId": 1, "title": "R8" },
        { "id": 3, "carBrandId": 1, "title": "Q7" },
        { "id": 4, "carBrandId": 1, "title": "A6" },
        { "id": 5, "carBrandId": 1, "title": "A8" },
        { "id": 6, "carBrandId": 2, "title": "3" },
        { "id": 7, "carBrandId": 2, "title": "5" },
        { "id": 8, "carBrandId": 2, "title": "X5" },
        { "id": 9, "carBrandId": 2, "title": "X6" },
        { "id": 10, "carBrandId": 2, "title": "Z3" },
        { "id": 11, "carBrandId": 3, "title": "Fiesta" },
        { "id": 12, "carBrandId": 3, "title": "Focus" },
        { "id": 13, "carBrandId": 3, "title": "Fusion" },
        { "id": 14, "carBrandId": 3, "title": "Mondeo" },
        { "id": 15, "carBrandId": 3, "title": "Sierra" },
        { "id": 16, "carBrandId": 4, "title": "911" },
        { "id": 17, "carBrandId": 4, "title": "Cayenne" },
        { "id": 18, "carBrandId": 4, "title": "Panamera" },
        { "id": 19, "carBrandId": 5, "title": "Palio" },
        { "id": 20, "carBrandId": 5, "title": "Ducato" },
        { "id": 21, "carBrandId": 5, "title": "Panda" },
        { "id": 22, "carBrandId": 5, "title": "Punto" },
        { "id": 23, "carBrandId": 5, "title": "Scudo" }
    ];

    cy.request({
        method: 'GET',
        url: `https://qauto.forstudy.space/api/cars/models`,
        headers: {
            Cookie: sessionCookieValue,
        },
    }).then((modelsResponse) => {
        const modelsArray = modelsResponse.body.data
        expect(modelsResponse.status).to.eq(200, 'Check the response status code valid');
        expect(modelsResponse.body).to.have.property('data');
        expect(modelsResponse.body.status).to.eq('ok', 'Check the status text is valid');
        expect(modelsArray.length).to.eq(carModels.length, 'Check the response body length');

        carModels.forEach((model, i) => {
            expect(model.id).to.be.a('number');
            expect(model.id).to.be.eq(modelsArray[i].id);
            expect(model.carBrandId).to.be.a('number');
            expect(model.carBrandId).to.be.eq(modelsArray[i].carBrandId);
            expect(model.title).to.be.a('string');
            expect(model.title).to.be.eq(modelsArray[i].title);
        });
    });
});


let carID;
let createdCarID;
let carBrandRnd;
let carMileageRnd;
let currentDate;
let carModelRnd;

it('Creates new car & check it present in car list [POST /cars & GET /api/cars]', function () { // { retries: 5 }
    const sessionCookieValue = `sid=${this.sessionId}`;
    carBrandRnd = Math.floor(Math.random() * 5) + 1;
    carMileageRnd = Math.floor(Math.random() * 9998) + 1;
    currentDate = new Date().toISOString();
    function getCarModalRnd() {
        switch (carBrandRnd) {
            case 1: // Audi
                return Math.floor(Math.random() * 5) + 1;
            case 2: // BMW 
                return Math.floor(Math.random() * 5) + 6;
            case 3: // Ford 
                return Math.floor(Math.random() * 5) + 11;
            case 4: // Porsche 
                return Math.floor(Math.random() * 3) + 16;
            case 5: // Fiat
                return Math.floor(Math.random() * 5) + 19;
            default:
                throw new Error(`Unsupported carBrandId: ${carBrandRnd}`);
        }
    }
    carModelRnd = getCarModalRnd();

    const carData = {
        "carBrandId": carBrandRnd,
        "carModelId": carModelRnd,
        "mileage": carMileageRnd
    };

    cy.request({
        method: 'POST',
        url: 'https://qauto.forstudy.space/api/cars',
        body: carData,
        headers: {
            cookie: sessionCookieValue,
        },
    }).then((carResponse) => {
        if (carResponse.status !== 201) {
            expect(carResponse.body).to.have.property('message');
            cy.log(`Error API: ${carResponse.body.message}`);
            return;
        };
        createdCarID = carResponse.body.data.id;
        let response = carResponse.body.data;

        expect(carResponse.status).to.eq(201, 'Check the response status code valid');
        expect(carResponse.body).to.have.property('data');
        expect(carResponse.body.status).to.eq('ok', 'Check the status text is valid');
        expect(response.id).to.be.a('number', 'Created car ID must be a number');
        expect(response.carBrandId).to.be.a('number', 'Car brand ID must be a number').and.to.be.eq(carData.carBrandId, 'Car brand ID value');
        expect(response.carModelId).to.be.a('number', 'Car model ID must be a number').and.to.be.eq(carData.carModelId, 'Car model ID value');
        expect(response.initialMileage).to.be.a('number', 'Car initial mileage must be a number').and.to.be.eq(carData.mileage, 'Car initial mileage value');
        expect(response.updatedMileageAt.slice(0, 15)).to.be.eq(currentDate.slice(0, 15), 'Created Date value');
        expect(response.mileage).to.be.a('number', 'Car mileage must be a number').and.to.be.eq(carData.mileage, 'Car mileage value');
        expect(response.mileage).to.eq(carResponse.body.data.initialMileage, 'Initial mileage = mileage');
        expect(response.brand).to.be.a('string', 'Checking the brand type');
        expect(response.model).to.be.a('string', 'Checking the model type');


        return cy.request({
            method: 'GET',
            url: 'https://qauto.forstudy.space/api/cars',
            headers: {
                Cookie: sessionCookieValue,
            },
        });
    }).then((carsResponse) => {
        expect(carsResponse.status).to.eq(200, 'Check the response status code valid');

        const carList = carsResponse.body.data;
        const foundCar = carList.find(car => car.id === createdCarID);

        expect(JSON.stringify(foundCar), 'Checking the body of created car in Cars List').to.exist;
        expect(foundCar.id).to.eq(createdCarID, 'Checking, ID of added car present in the list');
        expect(foundCar.initialMileage).to.eq(carData.mileage, 'Checking the mileage value');
        expect(foundCar.brand).to.be.a('string', 'Checking the brand type');
        expect(foundCar.model).to.be.a('string', 'Checking the model type');

        carID = createdCarID; //for next tests
    });
});

it('Edits existing car [PUT /cars/{id}]', function () {
    const sessionCookieValue = `sid=${this.sessionId}`;
    let carData = {
        "carBrandId": carBrandRnd,
        "carModelId": carModelRnd,
        "carCreatedAt": currentDate,
        "mileage": carMileageRnd + 1
    }
    cy.request({
        method: 'PUT',
        url: `https://qauto.forstudy.space/api/cars/${carID}`,
        body: carData,
        headers: {
            Cookie: sessionCookieValue,
        },
    }).then((carResponse) => {
        let response = carResponse.body.data;
        expect(carResponse.status).to.eq(200, 'Check the response status code valid');

        expect(carResponse.body).to.have.property('data');
        expect(carResponse.body.status).to.eq('ok', 'Check the status text is valid');

        expect(response.id).to.be.a('number', 'Created car ID must be a number');
        expect(response.carBrandId).to.be.a('number', 'Car brand ID must be a number').and.to.be.eq(carData.carBrandId, 'Car brand ID value');
        expect(response.carModelId).to.be.a('number', 'Car model ID must be a number').and.to.be.eq(carData.carModelId, 'Car model ID value');
        expect(response.initialMileage).to.be.a('number', 'Car initial mileage must be a number');
        expect(response.updatedMileageAt.slice(0, 15)).to.be.eq(currentDate.slice(0, 15), 'Created Date value');
        expect(response.mileage).to.be.a('number', 'Car mileage must be a number').and.to.be.eq(carData.mileage, 'Car mileage value');
        expect(response.mileage).to.not.eq(carResponse.body.data.initialMileage, 'Initial mileage != mileage');
        expect(response.brand).to.be.a('string', 'Checking the brand type');
        expect(response.model).to.be.a('string', 'Checking the model type');

    })
});

it.skip('Deletes existing car [DELETE /cars/{id}]', function () {
    const sessionCookieValue = `sid=${this.sessionId}`;

    cy.request({
        method: 'DELETE',
        url: `https://qauto.forstudy.space/api/cars/${carID}`,
        headers: {
            Cookie: sessionCookieValue,
        },
    }).then((deletedCarResponse) => {
        expect(deletedCarResponse.status).to.eq(200, 'Check the response status code valid');
        expect(deletedCarResponse.body).to.have.property('data');
        expect(deletedCarResponse.body.status).to.eq('ok', 'Check the status text is valid');
        expect(deletedCarResponse.body.data.carId).to.be.a('number', 'Deleted car ID must be a number');
        expect(deletedCarResponse.body.data.carId).to.eq(carID, 'Checking, ID of deleted car present in the response');

    });
});

it.only('Deletes all existing cars [GET & DELETE]', function () {
    const sessionCookieValue = `sid=${this.sessionId}`;

    cy.request({
        method: 'GET',
        url: 'https://qauto.forstudy.space/api/cars',
        headers: {
            cookie: sessionCookieValue,
        },
    }).then((carsResponse) => {
        expect(carsResponse.status).to.eq(200, 'Check GET status code valid');
        expect(carsResponse.body.status).to.eq('ok', 'Check response status is ok');

        const carList = carsResponse.body.data;

        if (carList.length === 0) {
            return cy.log('Car list is empty, nothing to delete.');
        }

        cy.wrap(carList).each((car) => {
            const carIdToDelete = car.id;

            cy.request({
                method: 'DELETE',
                url: `https://qauto.forstudy.space/api/cars/${carIdToDelete}`,
                headers: {
                    cookie: sessionCookieValue,
                },
            }).then((deleteResponse) => {
                expect(deleteResponse.status).to.eq(200, `Check DELETE status for ID ${carIdToDelete}`);
                expect(deleteResponse.body).to.have.property('data');
                expect(deleteResponse.body.status).to.eq('ok', 'Check the status text is valid');
                expect(deleteResponse.body.data.carId).to.be.a('number', 'Deleted car ID must be a number');
                expect(deleteResponse.body.data.carId).to.eq(carIdToDelete, 'Checking, ID of deleted car present in the response');

            });
        });
    });
});

//});
