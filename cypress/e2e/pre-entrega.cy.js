/// <reference types="cypress" />
import { LoginPage } from "../support/pages/loginPage";
import { ProductPage } from "../support/pages/productPage";
import { ShoppingCartPage } from "../support/pages/shoppingCartPage";
import { HomePage } from "../support/pages/homepage";
import { RegisterPage } from "../support/pages/registerPage";
import { CheckoutPage } from "../support/pages/checkout";
import { ReciptPage } from "../support/pages/recipt";
import { TIMEOUT } from "./constantes";

describe("Pre Entrega", () => {
let datalogin;
const loginPage = new LoginPage;
const productPage = new ProductPage;
const shoppingCartPage = new ShoppingCartPage;
const homePage = new HomePage;
const registerPage = new RegisterPage;
const checkoutPage = new CheckoutPage
const reciptPage = new ReciptPage

const username = 'Carlos' + Math.floor(Math.random()*1000)
const pass = '123456!'
const gender = 'Male'
const day = '10'
const month = 'July'
const year = '1945'

    before("Extraer datos fixture", () => {
        cy.fixture('pre-entrega').then(data => {
            datalogin = data
        })
    })

    it("Entrega Final", () => {
        cy.visit('')
        cy.request({
            method: "POST",
            url:"https://pushing-it.onrender.com/api/register",
            body:{
                username : username,
                password: pass,
                gender: gender,
                day: day,
                month: month,
                year: year

            }
        }).then(answer => {
            expect(answer.status).to.be.equal(200)
        })

        cy.request({
            url: 'https://pushing-it.onrender.com/api/login',
            method: 'POST',
            body:{
                username: username,
                password: pass
            }
        }).then(respuesta => {
            expect(respuesta.status).to.be.equal(200)
            window.localStorage.setItem('token', respuesta.body.token)
            window.localStorage.setItem('user', respuesta.body.user.username)
        })

        cy.visit('');
        homePage.selectOnlineShop({timeout:TIMEOUT});
        productPage.agregarAlCarrito(datalogin.Products.Product1.nameProduct1)
        productPage.agregarAlCarrito(datalogin.Products.Product2.nameProduct2)
        productPage.goShoppingCart()  
        shoppingCartPage.validateName(datalogin.Products.Product1.nameProduct1).should("have.text", datalogin.Products.Product1.nameProduct1)
        shoppingCartPage.validatePrice(datalogin.Products.Product1.nameProduct1, datalogin.Products.Product1.priceProduct1).should("have.text", `$${datalogin.Products.Product1.priceProduct1}`)
        shoppingCartPage.validateName(datalogin.Products.Product2.nameProduct2).should("have.text", datalogin.Products.Product2.nameProduct2)
        shoppingCartPage.validatePrice(datalogin.Products.Product2.nameProduct2, datalogin.Products.Product2.priceProduct2).should("have.text", `$${datalogin.Products.Product2.priceProduct2}`)
        shoppingCartPage.showTotalPrice()
        shoppingCartPage.validateFinalPrice().should("have.text", `${datalogin.Products.Product1.priceProduct1 + datalogin.Products.Product2.priceProduct2}`)
        shoppingCartPage.checkout()
        checkoutPage.completeName(datalogin.checkout.firstName)
        checkoutPage.completeLastName(datalogin.checkout.lastName)
        checkoutPage.completeCard(datalogin.checkout.cardNumber)
        checkoutPage.purchaseClick()
        reciptPage.validateName().should("have.text",`${datalogin.checkout.firstName} ${datalogin.checkout.lastName} has succesfully purchased the following items`)
        reciptPage.validateProducts(datalogin.Products.Product1.nameProduct1).should("have.text", datalogin.Products.Product1.nameProduct1)
        reciptPage.validateProducts(datalogin.Products.Product2.nameProduct2).should("have.text", datalogin.Products.Product2.nameProduct2)
        reciptPage.validateCreditCard().should("have.text", datalogin.checkout.cardNumber)
        reciptPage.validateTotalPrice().should("have.text", `You have spent $${datalogin.Products.Product1.priceProduct1 + datalogin.Products.Product2.priceProduct2}`)
    })

    after('Eliminamos el usuario creado',() => {
        cy.request({
            method : 'DELETE',
            url:`https://pushing-it.onrender.com/api/deleteuser/${username}`
        }).then(respuesta => {
            expect(respuesta.status).to.be.equal(200)
        })
    })
    
})