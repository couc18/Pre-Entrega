export class ShoppingCartPage {

    constructor(){
        this.totalPrice = "Show total price"
        this.finalPrice = 'p[id="price"]'
        this.checkOut = '//div[@class="css-641vkz"]//child::button'
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

    checkout(){
        cy.xpath(this.checkOut).click()
        
    }
}
