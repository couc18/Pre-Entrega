export class RegisterPage {
    constructor (){
        this.inicio = 'Iniciá'
    }

    buttonInit(){
        cy.contains(this.inicio).dblclick()
    }
}