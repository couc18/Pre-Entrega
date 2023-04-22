/// <reference types="cypress" />
import { LoginPage } from "../support/pages/loginPage";
import { ProductPage } from "../support/pages/productPage";
import { ShoppingCartPage } from "../support/pages/shoppingCartPage";

describe("Pre Entrega", () => {
let datalogin;
const timeout = 20000;
const loginPage = new LoginPage;
const productPage = new ProductPage;
const shoppingCartPage = new ShoppingCartPage;

    before("Extraer datos fixture", () => {
        cy.fixture('pre-entrega').then(data => {
            datalogin = data
        })
    })
    it("Ingresar a la pagina de PushingIt", () => {
        cy.visit('');
        cy.contains('span', 'Iniciá').dblclick()
        loginPage.typeUser(datalogin.login.user);
        loginPage.typePass(datalogin.login.password);
        loginPage.loginclick()
        cy.xpath('//div//child::a[@id="onlineshoplink"]',{timeout:timeout}).click();
        productPage.agregarAlCarrito(datalogin.Products.Product1.nameProduct1)
        productPage.agregarAlCarrito(datalogin.Products.Product2.nameProduct2)
        cy.xpath('//button[@id="goShoppingCart"]').click()   
        shoppingCartPage.validateName(datalogin.Products.Product1.nameProduct1).should("have.text", datalogin.Products.Product1.nameProduct1)
        shoppingCartPage.validatePrice(datalogin.Products.Product1.nameProduct1, datalogin.Products.Product1.priceProduct1).should("have.text", `$${datalogin.Products.Product1.priceProduct1}`)
        shoppingCartPage.validateName(datalogin.Products.Product2.nameProduct2).should("have.text", datalogin.Products.Product2.nameProduct2)
        shoppingCartPage.validatePrice(datalogin.Products.Product2.nameProduct2, datalogin.Products.Product2.priceProduct2).should("have.text", `$${datalogin.Products.Product2.priceProduct2}`)
        cy.contains("Show total price").click()
        cy.get('p[id="price"]').should("have.text", `${datalogin.Products.Product1.priceProduct1 + datalogin.Products.Product2.priceProduct2}`)
    })
})