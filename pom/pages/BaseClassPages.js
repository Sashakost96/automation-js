export class BaseClassPages {

    findPageSelector(selector) {
        return this.pageLocator.find(selector);
    }

    button(name) {
        return this.findPageSelector(`button.${name}`);
    }

    header() {
        return this.findPageSelector(``);
    }

    sideBar(name) {
        return this.findPageSelector(`.sidebar.d-flex.flex-column a[routerlink="${name}"]`);
    }

    footer() {
        return this.findPageSelector(``);
    }

    alert() {
        return this.findPageSelector(`.alert`)
    }

    titleH1() {
        return this.findPageSelector(`.panel-page_heading h1`)
    }

    carList() {
        return this.findPageSelector('.car-list');
    }
}