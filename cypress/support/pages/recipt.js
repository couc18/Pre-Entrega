import { TIMEOUT } from "../../e2e/constantes";
export class ReciptPage {

    constructor(){
        this.name = '#name'
        this.creditCard = '#creditCard',
        this.totalPrice = '#totalPrice'
    }
    

    validateName(){
        return cy.get(this.name, {timeout: TIMEOUT})
    }
    
    validateProducts(product){
        return cy.get(`[id="${product}"]`);
    }
    validateCreditCard(){
        return cy.get(this.creditCard)
    }
    validateTotalPrice(){
        return cy.get(this.totalPrice)
    }
}