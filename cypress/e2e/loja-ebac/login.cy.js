/// <reference types="cypress"/>
const perfil = require("../../fixtures/perfil.json")

describe('Funcionalidade: Login', () => {

    beforeEach(() => {
        cy.visit('minha-conta')
    });

    // afterEach(() => {
    //     cy.screenshot()
    // });

    it('Deve fazer login com sucesso', () => {
        cy.get('#username').type('pati@teste.com')
        cy.get('#password').type('Senha@123')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('exist')
    });

    it('Deve exibir uma mensagem de erro ao inserir usuário inválido', () => {
        cy.get('#username').type('pati.lemos@teste.com')
        cy.get('#password').type('Senha@123')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-error').should('contain', 'Endereço de e-mail desconhecido. Verifique novamente ou tente seu nome de usuário.')
    });

    it('Deve fazer login com sucesso - Usando massa de dados', () => {
        cy.get('#username').type(perfil.usuario)
        cy.get('#password').type(perfil.senha)
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('exist')

    });

    it('Deve fazer login com sucesso - Usando fixture', () => {
        cy.fixture('perfil').then(dados => {
            cy.get('#username').type(dados.usuario)
            cy.get('#password').type(dados.senha, { log: false })
            cy.get('.woocommerce-form > .button').click()
            cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('exist')
        });
    });

    it('Deve fazer login com sucesso - Usando Comandos Customizados', () => {
        cy.login('pati@teste.com', 'Senha@123')
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('exist')
    });
});