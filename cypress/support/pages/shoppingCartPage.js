export class ShoppingCartPage {

    constructor(){
        this.totalPrice = "Show total price"
        this.finalPrice = 'p[id="price"]'
    }

    validateName(product){
        return cy.get(`[name="${product}"]`);
    }

    validatePrice(product, price){
        return cy.contains(product).siblings(`[name="${price}"]`)
    }

    showTotalPrice(){
        cy.contains(this.totalPrice).click()
    }

    validateFinalPrice(){
       return cy.get(this.finalPrice)
    }
}
