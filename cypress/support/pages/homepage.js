export class HomePage {

    constructor(){
        this.onlineShop = '//div//child::a[@id="onlineshoplink"]'
    }

    selectOnlineShop(){
        cy.xpath(this.onlineShop).click()
    }
}