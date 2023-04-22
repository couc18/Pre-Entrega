export class ShoppingCartPage {

    validateName(product){
        return cy.get(`[name="${product}"]`);
    }

    validatePrice(product, price){
        return cy.contains(product).siblings(`[name="${price}"]`)
    }
}
