//Overwrite type command
Cypress.Commands.overwrite('type', (originalFn, element, text, options) => {
    if (options && options.sensitive) {
        options.log = false
        Cypress.log({
            $el: element,
            name: 'type',
            message: '*'.repeat(text.length),
        })
    }

    return originalFn(element, text, options)
})

//Custom command login(),
Cypress.Commands.add('login', (username, password) => {
    cy.contains("Sign In").click();
    cy.get('#signinEmail').type(username);
    cy.get('#signinPassword').type(password, { sensitive: true })
    cy.get('.modal-content .btn.btn-primary').click();
});

