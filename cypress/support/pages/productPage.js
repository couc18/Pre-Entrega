export class ProductPage {

    constructor(){
        this.goShoppingCartButton = '//button[@id="goShoppingCart"]'
    }

    agregarAlCarrito(product){
        cy.contains(`${product}`).siblings("button[type='button']").click()
        cy.xpath('//footer//child::button[@id="closeModal"]').click()
    }

    goShoppingCart() {
        cy.xpath(this.goShoppingCartButton).click()
    }

}