
export class HomePage {

  get header() {
    return cy.get('header.header.bg-basic-dark');
  }

  get navbar() {
    return this.header.find('nav.header_nav');
  }

  get homeLink() {
    return this.navbar.contains('a', 'Home');
  }

  get aboutButton() {
    return this.navbar.contains('button', 'About');
  }

  get contactsButton() {
    return this.navbar.contains('button', 'Contacts');
  }

  get guestLoginButton() {
    return this.header.find('button.header-link.-guest');
  }

  get signInButton() {
    return this.header.find('button.header_signin');
  }
  get signUpButton() {
    return cy.get('.hero-descriptor_btn');
  }
  get aboutSection() {
    return cy.get('#aboutSection');
  }

  get paragraphs() {
    return this.aboutSection.find('p');
  }
  get titleH1() {
    return cy.get('h1');
  }

  get descriptionText1() {
    return this.paragraphs.contains(
      'Keep track of your replacement schedule and plan your vehicle maintenance expenses in advance.'
    );
  }

  get descriptionText2() {
    return this.paragraphs.contains(
      'Watch over 100 instructions and repair your car yourself.'
    );
  }

  get featureText1() {
    return this.paragraphs.contains('Log fuel expenses');
  }

  get featureText2() {
    return this.paragraphs.contains('Instructions and manuals');
  }
  get contactsSection() {
    return cy.get('#contactsSection');
  }

  get title() {
    return this.contactsSection.find('h2');
  }

  get socials() {
    return this.contactsSection.find('div.contacts_socials.socials a');
  }

  get siteLink() {
    return this.contactsSection.find('a.contacts_link.display-4');
  }

  get mailLink() {
    return this.contactsSection.find('a.contacts_link.h4');
  }

  get footer() {
    return cy.get('footer');
  }

  get copyright() {
    return this.footer.find('p:first-child');
  }

  get purpose() {
    return this.footer.find('p:last-child');
  }

  get logo() {
    return this.footer.find('.footer_logo svg');
  }
}

export const homePage = new HomePage();
