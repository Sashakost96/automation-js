describe("Check the section - contacts", () => {
    beforeEach(() => {
        cy.visit("/");
    });
    it("Check the header of section", () => {
        cy.get("#contactsSection h2").should('have.text', "Contacts");
    });
    it("Check sociall buttons", () => {
        cy.get("#contactsSection div.contacts_socials.socials a:nth-child(1)")
            .should("have.attr", "href")
            .and("include", "https://www.facebook.com/Hillel.IT.School");
        cy.get("#contactsSection div.contacts_socials.socials a:nth-child(2)")
            .should("have.attr", "href")
            .and("include", "https://t.me/ithillel_kyiv");
        cy.get("#contactsSection div.contacts_socials.socials a:nth-child(3)")
            .should("have.attr", "href")
            .and(
                "include",
                "https://www.youtube.com/user/HillelITSchool?sub_confirmation=1"
            );
        cy.get("#contactsSection div.contacts_socials.socials a:nth-child(4)")
            .should("have.attr", "href")
            .and("include", "https://www.instagram.com/hillel_itschool/");
        cy.get("#contactsSection div.contacts_socials.socials a:nth-child(5)")
            .should("have.attr", "href")
            .and("include", "https://www.linkedin.com/school/ithillel/");
    });
    it("Check site and mail buttons", () => {
        cy.get("#contactsSection a.contacts_link.display-4")
            .should("have.attr", "href")
            .and("include", "https://ithillel.ua");
        cy.get("#contactsSection a.contacts_link.h4")
            .should("have.attr", "href")
            .and("include", "mailto:developer@ithillel.ua");
    });
});