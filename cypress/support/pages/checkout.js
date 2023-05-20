export class CheckoutPage {

constructor (){
    this.firstName = 'input[name="firstName"]',
    this.lastName = 'input[name="lastName"]',
    this.card = 'input[name="cardNumber"]'
    this.purchase = 'Purchase'
}

    completeName(name){
        cy.get(this.firstName).type(name)
    }
    completeLastName(lastName){
        cy.get(this.lastName).type(lastName)
    }
    completeCard(cardNumber){
        cy.get(this.card).type(cardNumber)
    }
    purchaseClick(){
        cy.contains(this.purchase).click()
    }

}