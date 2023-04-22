export class LoginPage {
    constructor(){
        this.userInput = '#user',
        this.passInput = 'input[name="pass"]' ,
        this.clickLogin = '#submitForm'
    }

    typeUser(user){
        cy.get(this.userInput).type(user)
    };
    typePass(pass){
        cy.get(this.passInput).type(pass)
    };
    loginclick(){
        cy.get(this.clickLogin).click()
    };
}