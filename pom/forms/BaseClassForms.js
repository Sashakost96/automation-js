export class BaseClassForms {

    findFormLocator(selector) {
        return this.getForm.get(selector)
    }

    title() {
        return this.findFormLocator(`h4.modal-title`);
    }

    label(name) {
        return this.findFormLocator(`.form-group:has([id="${name}"]) > label`);
    }

    inputField(name) {
        return this.findFormLocator(`[id="${name}"]`);
    }

    errorMessageInput() {
        return this.findFormLocator(`div .invalid-feedback p`) // .invalid-feedback p:nth-child(1)
    }

    errorAlert(name) {
        return this.findFormLocator(`form ${name}`) //p.alert.alert-danger
    }

    button(name) {
        return this.findFormLocator(`.modal-content button.${name}`);
    }

    randomValue() {
        return Date.now();
    }
}