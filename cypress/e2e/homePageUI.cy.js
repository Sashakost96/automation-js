/// <reference types="cypress" />

import HomePage, { homePage } from "../../pom/pages/HomePage";

describe('Check Header navigation', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Should display correct header elements', () => {
        homePage.header.should('be.visible');
        homePage.homeLink.should('have.text', 'Home');
        homePage.aboutButton.should('be.visible').and('have.text', 'About');
        homePage.contactsButton.should('be.visible').and('have.text', 'Contacts');
        homePage.guestLoginButton.should('contain.text', 'Guest log in');
        homePage.signInButton.should('contain.text', 'Sign In');
    });
});
describe('Check the section - About', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Check the h2 text', () => {
        homePage.featureText1.should('be.visible');
        homePage.featureText2.should('be.visible');
    });

    it('Check the h2 description text', () => {
        homePage.descriptionText1.should('be.visible');
        homePage.descriptionText2.should('be.visible');
    });
});

describe('Check the section - Contacts', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Check the title of section', () => {
        homePage.title.should('contain.text', 'Contacts');
    });

    it('Check social buttons', () => {
        const expectedLinks = [
            'https://www.facebook.com/Hillel.IT.School',
            'https://t.me/ithillel_kyiv',
            'https://www.youtube.com/user/HillelITSchool?sub_confirmation=1',
            'https://www.instagram.com/hillel_itschool/',
            'https://www.linkedin.com/school/ithillel/',
        ];

        homePage.socials.each((el, index) => {
            cy.wrap(el)
                .should('have.attr', 'href')
                .and('include', expectedLinks[index]);
        });
    });

    it('Check site and mail buttons', () => {
        homePage.siteLink.should('have.attr', 'href').and('include', 'https://ithillel.ua');
        homePage.mailLink.should('have.attr', 'href').and('include', 'mailto:developer@ithillel.ua');
    });
});
describe('Check the footer elements', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Check copyright text', () => {
        homePage
            .copyright
            .should('contain.text', '© 2021 Hillel IT school');
    });

    it('Check site purposes text', () => {
        homePage
            .purpose
            .should('contain.text', 'Hillel auto developed in Hillel IT school for educational purposes of QA courses');
    });

    it('Check site logo', () => {
        homePage.logo.should('be.visible');
        homePage.logo.invoke('attr', 'width').should('eq', '42');
        homePage.logo.invoke('attr', 'height').should('eq', '80');
    });
});

