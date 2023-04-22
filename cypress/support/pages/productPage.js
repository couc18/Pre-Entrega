export class ProductPage {

    agregarAlCarrito(product){
        cy.contains(`${product}`).siblings("button[type='button']").click()
        cy.xpath('//footer//child::button[@id="closeModal"]').click()
    }

}